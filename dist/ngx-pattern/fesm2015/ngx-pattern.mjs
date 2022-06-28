import * as i0 from '@angular/core';
import { ElementRef, Directive, Inject, Optional, Input, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NgControl, FormsModule } from '@angular/forms';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

class NgxPatternDirective {
    constructor(host, control) {
        this.host = host;
        this.control = control;
        this.unsubscribeSubj = new Subject();
        this.lastSelectionStart = 0;
        this.lastSelectionEnd = 0;
        this.lastValue = '';
    }
    ngOnInit() {
        fromEvent(this.host.nativeElement, 'paste')
            .pipe(takeUntil(this.unsubscribeSubj), tap((e) => this.onPaste(e)))
            .subscribe();
        fromEvent(this.host.nativeElement, 'keydown')
            .pipe(takeUntil(this.unsubscribeSubj), tap((e) => this.onKeyDown(e)))
            .subscribe();
        fromEvent(this.host.nativeElement, 'touchend')
            .pipe(takeUntil(this.unsubscribeSubj), tap((e) => this.onClick(e)))
            .subscribe();
    }
    ngOnChanges() {
        if (this.ngxPattern) {
            if (typeof this.ngxPattern === 'string') {
                this.regex = new RegExp(`^${this.ngxPattern}$`, 'g');
            }
            else {
                this.regex = this.ngxPattern;
            }
        }
    }
    ngOnDestroy() {
        this.unsubscribeSubj.next();
        this.unsubscribeSubj.unsubscribe();
    }
    initSelectionValues(input) {
        this.lastValue = input.value || '';
        const { selectionStart, selectionEnd, } = this.inputEl;
        if (selectionStart !== null) {
            this.lastSelectionStart = selectionStart;
        }
        if (selectionEnd !== null) {
            this.lastSelectionEnd = selectionEnd;
        }
    }
    onKeyDown(e) {
        const input = e === null || e === void 0 ? void 0 : e.currentTarget;
        this.initSelectionValues(input);
        if (this.regex && e && !e.ctrlKey && !e.metaKey && !isSpecialKey(e.key)) {
            if (!this.validWithChange(e.key)) {
                e.preventDefault();
            }
        }
    }
    onClick(ev) {
        this.initSelectionValues(ev.target);
    }
    onInput() {
        if (this.currentValue && !this.textIsValid(this.currentValue)) {
            // Mobile browsers don't support keydown preventDefault and return
            // Unidentified for the pressed key. We need to detect the change on input event and undo.
            document.execCommand('undo');
        }
    }
    onPaste(e) {
        var _a, _b;
        const pastedInput = (_a = e === null || e === void 0 ? void 0 : e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
        if (pastedInput) {
            e === null || e === void 0 ? void 0 : e.preventDefault();
            if (this.validWithChange(pastedInput)) {
                const text = this.lastValue.substring(0, this.lastSelectionStart) + pastedInput + this.lastValue.substring(this.lastSelectionEnd);
                if (this.control) {
                    (_b = this.control.control) === null || _b === void 0 ? void 0 : _b.setValue(text);
                }
                else {
                    this.inputEl.value = text;
                }
                this.inputEl.setSelectionRange(this.lastSelectionEnd + pastedInput.length, this.lastSelectionStart + pastedInput.length);
            }
        }
    }
    onDrop(e) {
        var _a;
        const textData = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text');
        if (textData && !this.validWithChange(textData)) {
            e.preventDefault();
        }
    }
    get currentValue() {
        return this.inputEl ? this.inputEl.value : undefined;
    }
    validWithChange(delta) {
        const { value: current, selectionStart, selectionEnd, } = this.inputEl;
        if (selectionEnd === null || selectionStart === null) {
            return false;
        }
        const updated = current.substring(0, selectionStart) + delta + current.substring(selectionEnd + 1);
        return this.textIsValid(updated);
    }
    textIsValid(text) {
        const result = !text || this.regex.test(text);
        this.regex.lastIndex = 0;
        return result;
    }
    get inputEl() {
        return this.host.nativeElement;
    }
}
NgxPatternDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternDirective, deps: [{ token: ElementRef }, { token: NgControl, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NgxPatternDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.3", type: NgxPatternDirective, selector: "[ngxPattern]", inputs: { ngxPattern: "ngxPattern" }, host: { listeners: { "input": "onInput()", "drop": "onDrop($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxPattern]'
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef, decorators: [{
                        type: Inject,
                        args: [ElementRef]
                    }] }, { type: i1.NgControl, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [NgControl]
                    }] }];
    }, propDecorators: { ngxPattern: [{
                type: Input
            }], onInput: [{
                type: HostListener,
                args: ['input', []]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
/** @see https://developer.mozilla.org/bg/docs/Web/API/KeyboardEvent/key/Key_Values */
function isSpecialKey(key) {
    return key.length > 1;
}

class NgxPatternModule {
}
NgxPatternModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxPatternModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternModule, declarations: [NgxPatternDirective], imports: [FormsModule], exports: [NgxPatternDirective] });
NgxPatternModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternModule, imports: [FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.3", ngImport: i0, type: NgxPatternModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxPatternDirective],
                    imports: [
                        FormsModule
                    ],
                    exports: [
                        NgxPatternDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-pattern
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxPatternDirective, NgxPatternModule };
//# sourceMappingURL=ngx-pattern.mjs.map
