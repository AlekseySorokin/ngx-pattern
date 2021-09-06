import { __decorate, __param } from 'tslib';
import { Input, HostListener, Directive, Inject, ElementRef, Optional, NgModule } from '@angular/core';
import { NgControl, FormsModule } from '@angular/forms';

let NgxPatternDirective = class NgxPatternDirective {
    constructor(host, control) {
        this.host = host;
        this.control = control;
        this.lastSelectionStart = 0;
        this.lastSelectionEnd = 0;
        this.lastValue = '';
    }
    ngOnInit() {
        this.onPasteHandler = (e) => {
            this.onPaste(e);
        };
        this.onKeydownHandler = (e) => {
            this.onKeyDown(e);
        };
        this.host.nativeElement.addEventListener('keydown', this.onKeydownHandler);
        this.host.nativeElement.addEventListener('paste', this.onPasteHandler);
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
        this.host.nativeElement.removeEventListener('keydown', this.onKeydownHandler);
        this.host.nativeElement.removeEventListener('paste', this.onPasteHandler);
    }
    onKeyDown(e) {
        const input = e === null || e === void 0 ? void 0 : e.currentTarget;
        this.lastValue = input.value || '';
        const { selectionStart, selectionEnd, } = this.inputEl;
        if (selectionStart !== null) {
            this.lastSelectionStart = selectionStart;
        }
        if (selectionEnd !== null) {
            this.lastSelectionEnd = selectionEnd;
        }
        if (this.regex && e && !e.ctrlKey && !e.metaKey && !isSpecialKey(e.key)) {
            if (!this.validWithChange(e.key)) {
                e.preventDefault();
            }
        }
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
};
__decorate([
    Input()
], NgxPatternDirective.prototype, "ngxPattern", void 0);
__decorate([
    HostListener('input', [])
], NgxPatternDirective.prototype, "onInput", null);
__decorate([
    HostListener('drop', ['$event'])
], NgxPatternDirective.prototype, "onDrop", null);
NgxPatternDirective = __decorate([
    Directive({
        selector: '[ngxPattern]'
    }),
    __param(0, Inject(ElementRef)), __param(1, Optional()), __param(1, Inject(NgControl))
], NgxPatternDirective);
/** @see https://developer.mozilla.org/bg/docs/Web/API/KeyboardEvent/key/Key_Values */
function isSpecialKey(key) {
    return key.length > 1;
}

let NgxPatternModule = class NgxPatternModule {
};
NgxPatternModule = __decorate([
    NgModule({
        declarations: [NgxPatternDirective],
        imports: [
            FormsModule
        ],
        exports: [
            NgxPatternDirective
        ]
    })
], NgxPatternModule);

/*
 * Public API Surface of ngx-pattern
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxPatternDirective, NgxPatternModule };
//# sourceMappingURL=ngx-pattern.js.map
