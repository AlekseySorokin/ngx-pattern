import { Directive, ElementRef, HostListener, Inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class NgxPatternDirective {
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
        const input = e?.currentTarget;
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
        const pastedInput = e?.clipboardData?.getData('text/plain');
        if (pastedInput) {
            e?.preventDefault();
            if (this.validWithChange(pastedInput)) {
                const text = this.lastValue.substring(0, this.lastSelectionStart) + pastedInput + this.lastValue.substring(this.lastSelectionEnd);
                if (this.control) {
                    this.control.control?.setValue(text);
                }
                else {
                    this.inputEl.value = text;
                }
                this.inputEl.setSelectionRange(this.lastSelectionEnd + pastedInput.length, this.lastSelectionStart + pastedInput.length);
            }
        }
    }
    onDrop(e) {
        const textData = e.dataTransfer?.getData('text');
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef, decorators: [{
                    type: Inject,
                    args: [ElementRef]
                }] }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NgControl]
                }] }]; }, propDecorators: { ngxPattern: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBhdHRlcm4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXBhdHRlcm4vc3JjL2xpYi9uZ3gtcGF0dGVybi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLaEQsTUFBTSxPQUFPLG1CQUFtQjtJQVM5QixZQUF3QyxJQUFnQixFQUF5QyxPQUFrQjtRQUEzRSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFSM0csb0JBQWUsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUlyRCx1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFHdkIsQ0FBQztJQUVELFFBQVE7UUFDTixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO2FBQ3hDLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUMvQixHQUFHLENBQUMsQ0FBQyxDQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVDO2FBQ0EsU0FBUyxFQUFFLENBQUM7UUFFZixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUs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cG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25neFBhdHRlcm5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4UGF0dGVybkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVTdWJqOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBASW5wdXQoKSBuZ3hQYXR0ZXJuOiBSZWdFeHAgfCBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVnZXg6IFJlZ0V4cDtcclxuICBwcml2YXRlIGxhc3RTZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgcHJpdmF0ZSBsYXN0U2VsZWN0aW9uRW5kID0gMDtcclxuICBwcml2YXRlIGxhc3RWYWx1ZSA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgQEluamVjdChOZ0NvbnRyb2wpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGZyb21FdmVudCh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ3Bhc3RlJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmVTdWJqKSxcclxuICAgICAgICB0YXAoKGU6IENsaXBib2FyZEV2ZW50KSA9PiB0aGlzLm9uUGFzdGUoZSkpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG5cclxuICAgIGZyb21FdmVudCh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZVN1YmopLFxyXG4gICAgICAgIHRhcCgoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5vbktleURvd24oZSkpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG5cclxuICAgIGZyb21FdmVudCh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ3RvdWNoZW5kJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmVTdWJqKSxcclxuICAgICAgICB0YXAoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMub25DbGljayhlKSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm5neFBhdHRlcm4pIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm5neFBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhpcy5yZWdleCA9IG5ldyBSZWdFeHAoYF4ke3RoaXMubmd4UGF0dGVybn0kYCwgJ2cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlZ2V4ID0gdGhpcy5uZ3hQYXR0ZXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVTdWJqLm5leHQoKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVTdWJqLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRTZWxlY3Rpb25WYWx1ZXMoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgIHRoaXMubGFzdFZhbHVlID0gaW5wdXQudmFsdWUgfHwgJyc7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmQsXHJcbiAgICB9ID0gdGhpcy5pbnB1dEVsO1xyXG4gICAgaWYgKHNlbGVjdGlvblN0YXJ0ICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubGFzdFNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZWN0aW9uRW5kICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubGFzdFNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25LZXlEb3duKGU/OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGU/LmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuaW5pdFNlbGVjdGlvblZhbHVlcyhpbnB1dCk7XHJcbiAgICBpZiAodGhpcy5yZWdleCAmJiBlICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhaXNTcGVjaWFsS2V5KGUua2V5KSkge1xyXG4gICAgICBpZiAoIXRoaXMudmFsaWRXaXRoQ2hhbmdlKGUua2V5KSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGljayhldjogRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdFNlbGVjdGlvblZhbHVlcyhldi50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFtdKVxyXG4gIG9uSW5wdXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VmFsdWUgJiYgIXRoaXMudGV4dElzVmFsaWQodGhpcy5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgIC8vIE1vYmlsZSBicm93c2VycyBkb24ndCBzdXBwb3J0IGtleWRvd24gcHJldmVudERlZmF1bHQgYW5kIHJldHVyblxyXG4gICAgICAvLyBVbmlkZW50aWZpZWQgZm9yIHRoZSBwcmVzc2VkIGtleS4gV2UgbmVlZCB0byBkZXRlY3QgdGhlIGNoYW5nZSBvbiBpbnB1dCBldmVudCBhbmQgdW5kby5cclxuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3VuZG8nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25QYXN0ZShlPzogQ2xpcGJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhc3RlZElucHV0ID0gZT8uY2xpcGJvYXJkRGF0YT8uZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgaWYgKHBhc3RlZElucHV0KSB7XHJcbiAgICAgIGU/LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGlmICh0aGlzLnZhbGlkV2l0aENoYW5nZShwYXN0ZWRJbnB1dCkpIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5sYXN0VmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMubGFzdFNlbGVjdGlvblN0YXJ0KSArIHBhc3RlZElucHV0ICsgdGhpcy5sYXN0VmFsdWUuc3Vic3RyaW5nKHRoaXMubGFzdFNlbGVjdGlvbkVuZCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xyXG4gICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2w/LnNldFZhbHVlKHRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmlucHV0RWwudmFsdWUgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlucHV0RWwuc2V0U2VsZWN0aW9uUmFuZ2UodGhpcy5sYXN0U2VsZWN0aW9uRW5kICsgcGFzdGVkSW5wdXQubGVuZ3RoLCB0aGlzLmxhc3RTZWxlY3Rpb25TdGFydCArIHBhc3RlZElucHV0Lmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIG9uRHJvcChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRleHREYXRhID0gZS5kYXRhVHJhbnNmZXI/LmdldERhdGEoJ3RleHQnKTtcclxuXHJcbiAgICBpZiAodGV4dERhdGEgJiYgIXRoaXMudmFsaWRXaXRoQ2hhbmdlKHRleHREYXRhKSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgY3VycmVudFZhbHVlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnB1dEVsID8gdGhpcy5pbnB1dEVsLnZhbHVlIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZFdpdGhDaGFuZ2UoZGVsdGE6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB2YWx1ZTogY3VycmVudCxcclxuICAgICAgc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHNlbGVjdGlvbkVuZCxcclxuICAgIH0gPSB0aGlzLmlucHV0RWw7XHJcbiAgICBpZiAoc2VsZWN0aW9uRW5kID09PSBudWxsIHx8IHNlbGVjdGlvblN0YXJ0ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBjdXJyZW50LnN1YnN0cmluZygwLCBzZWxlY3Rpb25TdGFydCkgKyBkZWx0YSArIGN1cnJlbnQuc3Vic3RyaW5nKHNlbGVjdGlvbkVuZCArIDEpO1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dElzVmFsaWQodXBkYXRlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRleHRJc1ZhbGlkKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gIXRleHQgfHwgdGhpcy5yZWdleC50ZXN0KHRleHQpO1xyXG4gICAgdGhpcy5yZWdleC5sYXN0SW5kZXggPSAwO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBnZXQgaW5wdXRFbCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLmhvc3QubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2JnL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2tleS9LZXlfVmFsdWVzICovXHJcbmZ1bmN0aW9uIGlzU3BlY2lhbEtleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBrZXkubGVuZ3RoID4gMTtcclxufVxyXG4iXX0=