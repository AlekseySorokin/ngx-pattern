import { __decorate, __param } from "tslib";
import { Directive, ElementRef, HostListener, Inject, Input, Optional } from '@angular/core';
let NgxPatternDirective = class NgxPatternDirective {
    constructor(host, control) {
        this.host = host;
        this.control = control;
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
    __param(0, Inject(ElementRef)), __param(1, Optional())
], NgxPatternDirective);
export { NgxPatternDirective };
/** @see https://developer.mozilla.org/bg/docs/Web/API/KeyboardEvent/key/Key_Values */
function isSpecialKey(key) {
    return key.length > 1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBhdHRlcm4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL9CQ0LvQtdC60YHQtdC5L1BocHN0b3JtUHJvamVjdHMvbmd4LXBhdHRlcm4vcHJvamVjdHMvbmd4LXBhdHRlcm4vc3JjLyIsInNvdXJjZXMiOlsibGliL25neC1wYXR0ZXJuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBTXZCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBVTlCLFlBQXdDLElBQWdCLEVBQXNCLE9BQWtCO1FBQXhELFNBQUksR0FBSixJQUFJLENBQVk7UUFBc0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztJQUNoRyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFpQixFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFnQixFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxR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QUFJLENBQUMsYUFBYSxDQUFDO0lBQ2pDLENBQUM7Q0FDRixDQUFBO0FBdkhVO0lBQVIsS0FBSyxFQUFFO3VEQUE2QjtBQTJEckM7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztrREFPekI7QUFtQkQ7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7aURBT2hDO0FBM0ZVLG1CQUFtQjtJQUgvQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztLQUN6QixDQUFDO0lBV2EsV0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUEsRUFBNEIsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQVYxRCxtQkFBbUIsQ0F3SC9CO1NBeEhZLG1CQUFtQjtBQTBIaEMsc0ZBQXNGO0FBQ3RGLFNBQVMsWUFBWSxDQUFDLEdBQVc7SUFDL0IsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25neFBhdHRlcm5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4UGF0dGVybkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIG5neFBhdHRlcm46IFJlZ0V4cCB8IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWdleDogUmVnRXhwO1xyXG4gIHByaXZhdGUgbGFzdFNlbGVjdGlvblN0YXJ0OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsYXN0U2VsZWN0aW9uRW5kOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IHN0cmluZztcclxuICBvblBhc3RlSGFuZGxlcjogKGU6IENsaXBib2FyZEV2ZW50KSA9PiB2b2lkO1xyXG4gIG9uS2V5ZG93bkhhbmRsZXI6IChlOiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblBhc3RlSGFuZGxlciA9IChlOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uUGFzdGUoZSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5vbktleWRvd25IYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vbktleURvd24oZSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duSGFuZGxlcik7XHJcbiAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMub25QYXN0ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5uZ3hQYXR0ZXJuKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5uZ3hQYXR0ZXJuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRoaXMucmVnZXggPSBuZXcgUmVnRXhwKGBeJHt0aGlzLm5neFBhdHRlcm59JGAsICdnJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZWdleCA9IHRoaXMubmd4UGF0dGVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd25IYW5kbGVyKTtcclxuICAgIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgdGhpcy5vblBhc3RlSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uS2V5RG93bihlPzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXQgPSBlPy5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IGlucHV0LnZhbHVlIHx8ICcnO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzZWxlY3Rpb25TdGFydCxcclxuICAgICAgc2VsZWN0aW9uRW5kLFxyXG4gICAgfSA9IHRoaXMuaW5wdXRFbDtcclxuICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhc3RTZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0O1xyXG4gICAgfVxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhc3RTZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdleCAmJiBlICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhaXNTcGVjaWFsS2V5KGUua2V5KSkge1xyXG4gICAgICBpZiAoIXRoaXMudmFsaWRXaXRoQ2hhbmdlKGUua2V5KSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbXSlcclxuICBvbklucHV0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFZhbHVlICYmICF0aGlzLnRleHRJc1ZhbGlkKHRoaXMuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAvLyBNb2JpbGUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCBrZXlkb3duIHByZXZlbnREZWZhdWx0IGFuZCByZXR1cm5cclxuICAgICAgLy8gVW5pZGVudGlmaWVkIGZvciB0aGUgcHJlc3NlZCBrZXkuIFdlIG5lZWQgdG8gZGV0ZWN0IHRoZSBjaGFuZ2Ugb24gaW5wdXQgZXZlbnQgYW5kIHVuZG8uXHJcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCd1bmRvJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUGFzdGUoZT86IENsaXBib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXN0ZWRJbnB1dCA9IGU/LmNsaXBib2FyZERhdGE/LmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgIGlmIChwYXN0ZWRJbnB1dCkge1xyXG4gICAgICBlPy5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAodGhpcy52YWxpZFdpdGhDaGFuZ2UocGFzdGVkSW5wdXQpKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMubGFzdFZhbHVlLnN1YnN0cmluZygwLCB0aGlzLmxhc3RTZWxlY3Rpb25TdGFydCkgKyBwYXN0ZWRJbnB1dCArIHRoaXMubGFzdFZhbHVlLnN1YnN0cmluZyh0aGlzLmxhc3RTZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcclxuICAgICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sPy5zZXRWYWx1ZSh0ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbnB1dEVsLnZhbHVlID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dEVsLnNldFNlbGVjdGlvblJhbmdlKHRoaXMubGFzdFNlbGVjdGlvbkVuZCArIHBhc3RlZElucHV0Lmxlbmd0aCwgdGhpcy5sYXN0U2VsZWN0aW9uU3RhcnQgKyBwYXN0ZWRJbnB1dC5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICBvbkRyb3AoZTogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0ZXh0RGF0YSA9IGUuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0Jyk7XHJcblxyXG4gICAgaWYgKHRleHREYXRhICYmICF0aGlzLnZhbGlkV2l0aENoYW5nZSh0ZXh0RGF0YSkpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5wdXRFbCA/IHRoaXMuaW5wdXRFbC52YWx1ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRXaXRoQ2hhbmdlKGRlbHRhOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdmFsdWU6IGN1cnJlbnQsXHJcbiAgICAgIHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBzZWxlY3Rpb25FbmQsXHJcbiAgICB9ID0gdGhpcy5pbnB1dEVsO1xyXG4gICAgaWYgKHNlbGVjdGlvbkVuZCA9PT0gbnVsbCB8fCBzZWxlY3Rpb25TdGFydCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cGRhdGVkID0gY3VycmVudC5zdWJzdHJpbmcoMCwgc2VsZWN0aW9uU3RhcnQpICsgZGVsdGEgKyBjdXJyZW50LnN1YnN0cmluZyhzZWxlY3Rpb25FbmQgKyAxKTtcclxuICAgIHJldHVybiB0aGlzLnRleHRJc1ZhbGlkKHVwZGF0ZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0ZXh0SXNWYWxpZCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9ICF0ZXh0IHx8IHRoaXMucmVnZXgudGVzdCh0ZXh0KTtcclxuICAgIHRoaXMucmVnZXgubGFzdEluZGV4ID0gMDtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlucHV0RWwoKTogSFRNTElucHV0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9iZy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9rZXkvS2V5X1ZhbHVlcyAqL1xyXG5mdW5jdGlvbiBpc1NwZWNpYWxLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4ga2V5Lmxlbmd0aCA+IDE7XHJcbn1cclxuIl19