import { __decorate, __param } from "tslib";
import { Directive, ElementRef, HostListener, Inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
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
export { NgxPatternDirective };
/** @see https://developer.mozilla.org/bg/docs/Web/API/KeyboardEvent/key/Key_Values */
function isSpecialKey(key) {
    return key.length > 1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBhdHRlcm4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL9CQ0LvQtdC60YHQtdC5L1BocHN0b3JtUHJvamVjdHMvbmd4LXBhdHRlcm4vcHJvamVjdHMvbmd4LXBhdHRlcm4vc3JjLyIsInNvdXJjZXMiOlsibGliL25neC1wYXR0ZXJuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUszQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVU5QixZQUF3QyxJQUFnQixFQUF5QyxPQUFrQjtRQUEzRSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFOM0csdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBS3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQWlCLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQWdCLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FB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LENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7QUF2SFU7SUFBUixLQUFLLEVBQUU7dURBQTZCO0FBMkRyQztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2tEQU96QjtBQW1CRDtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpREFPaEM7QUEzRlUsbUJBQW1CO0lBSC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO0tBQ3pCLENBQUM7SUFXYSxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQSxFQUE0QixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7R0FWN0UsbUJBQW1CLENBd0gvQjtTQXhIWSxtQkFBbUI7QUEwSGhDLHNGQUFzRjtBQUN0RixTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQy9CLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ3hQYXR0ZXJuXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFBhdHRlcm5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBuZ3hQYXR0ZXJuOiBSZWdFeHAgfCBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVnZXg6IFJlZ0V4cDtcclxuICBwcml2YXRlIGxhc3RTZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgcHJpdmF0ZSBsYXN0U2VsZWN0aW9uRW5kID0gMDtcclxuICBwcml2YXRlIGxhc3RWYWx1ZSA9ICcnO1xyXG4gIG9uUGFzdGVIYW5kbGVyOiAoZTogQ2xpcGJvYXJkRXZlbnQpID0+IHZvaWQ7XHJcbiAgb25LZXlkb3duSGFuZGxlcjogKGU6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5nQ29udHJvbCkgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblBhc3RlSGFuZGxlciA9IChlOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uUGFzdGUoZSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5vbktleWRvd25IYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vbktleURvd24oZSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duSGFuZGxlcik7XHJcbiAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMub25QYXN0ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5uZ3hQYXR0ZXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5uZ3hQYXR0ZXJuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRoaXMucmVnZXggPSBuZXcgUmVnRXhwKGBeJHt0aGlzLm5neFBhdHRlcm59JGAsICdnJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZWdleCA9IHRoaXMubmd4UGF0dGVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd25IYW5kbGVyKTtcclxuICAgIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgdGhpcy5vblBhc3RlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uS2V5RG93bihlPzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXQgPSBlPy5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IGlucHV0LnZhbHVlIHx8ICcnO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzZWxlY3Rpb25TdGFydCxcclxuICAgICAgc2VsZWN0aW9uRW5kLFxyXG4gICAgfSA9IHRoaXMuaW5wdXRFbDtcclxuICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhc3RTZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xyXG4gICAgfVxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhc3RTZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdleCAmJiBlICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhaXNTcGVjaWFsS2V5KGUua2V5KSkge1xyXG4gICAgICBpZiAoIXRoaXMudmFsaWRXaXRoQ2hhbmdlKGUua2V5KSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbXSlcclxuICBvbklucHV0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFZhbHVlICYmICF0aGlzLnRleHRJc1ZhbGlkKHRoaXMuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAvLyBNb2JpbGUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCBrZXlkb3duIHByZXZlbnREZWZhdWx0IGFuZCByZXR1cm5cclxuICAgICAgLy8gVW5pZGVudGlmaWVkIGZvciB0aGUgcHJlc3NlZCBrZXkuIFdlIG5lZWQgdG8gZGV0ZWN0IHRoZSBjaGFuZ2Ugb24gaW5wdXQgZXZlbnQgYW5kIHVuZG8uXHJcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmRvJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUGFzdGUoZT86IENsaXBib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXN0ZWRJbnB1dCA9IGU/LmNsaXBib2FyZERhdGE/LmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgIGlmIChwYXN0ZWRJbnB1dCkge1xyXG4gICAgICBlPy5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAodGhpcy52YWxpZFdpdGhDaGFuZ2UocGFzdGVkSW5wdXQpKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMubGFzdFZhbHVlLnN1YnN0cmluZygwLCB0aGlzLmxhc3RTZWxlY3Rpb25TdGFydCkgKyBwYXN0ZWRJbnB1dCArIHRoaXMubGFzdFZhbHVlLnN1YnN0cmluZyh0aGlzLmxhc3RTZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcclxuICAgICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sPy5zZXRWYWx1ZSh0ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dEVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMubGFzdFNlbGVjdGlvbkVuZCArIHBhc3RlZElucHV0Lmxlbmd0aCwgdGhpcy5sYXN0U2VsZWN0aW9uU3RhcnQgKyBwYXN0ZWRJbnB1dC5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICBvbkRyb3AoZTogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0ZXh0RGF0YSA9IGUuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0Jyk7XHJcblxyXG4gICAgaWYgKHRleHREYXRhICYmICF0aGlzLnZhbGlkV2l0aENoYW5nZSh0ZXh0RGF0YSkpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5wdXRFbCA/IHRoaXMuaW5wdXRFbC52YWx1ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRXaXRoQ2hhbmdlKGRlbHRhOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdmFsdWU6IGN1cnJlbnQsXHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmQsXHJcbiAgICB9ID0gdGhpcy5pbnB1dEVsO1xyXG4gICAgaWYgKHNlbGVjdGlvbkVuZCA9PT0gbnVsbCB8fCBzZWxlY3Rpb25TdGFydCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVkID0gY3VycmVudC5zdWJzdHJpbmcoMCwgc2VsZWN0aW9uU3RhcnQpICsgZGVsdGEgKyBjdXJyZW50LnN1YnN0cmluZyhzZWxlY3Rpb25FbmQgKyAxKTtcclxuICAgIHJldHVybiB0aGlzLnRleHRJc1ZhbGlkKHVwZGF0ZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXh0SXNWYWxpZCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9ICF0ZXh0IHx8IHRoaXMucmVnZXgudGVzdCh0ZXh0KTtcclxuICAgIHRoaXMucmVnZXgubGFzdEluZGV4ID0gMDtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlucHV0RWwoKTogSFRNTElucHV0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9iZy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9rZXkvS2V5X1ZhbHVlcyAqL1xyXG5mdW5jdGlvbiBpc1NwZWNpYWxLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4ga2V5Lmxlbmd0aCA+IDE7XHJcbn1cclxuIl19