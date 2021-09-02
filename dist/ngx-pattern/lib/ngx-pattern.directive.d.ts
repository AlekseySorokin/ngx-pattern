import { ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class NgxPatternDirective implements OnChanges, OnInit, OnDestroy {
    private host;
    private control;
    ngxPattern: RegExp | string;
    private regex;
    private lastSelectionStart;
    private lastSelectionEnd;
    private lastValue;
    onPasteHandler: (e: ClipboardEvent) => void;
    onKeydownHandler: (e: KeyboardEvent) => void;
    constructor(host: ElementRef, control: NgControl);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private onKeyDown;
    onInput(): void;
    private onPaste;
    onDrop(e: DragEvent): void;
    get currentValue(): string | undefined;
    private validWithChange;
    private textIsValid;
    get inputEl(): HTMLInputElement;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxPatternDirective, [null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NgxPatternDirective, "[ngxPattern]", never, { "ngxPattern": "ngxPattern"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBhdHRlcm4uZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbIm5neC1wYXR0ZXJuLmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5neFBhdHRlcm5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgaG9zdDtcclxuICAgIHByaXZhdGUgY29udHJvbDtcclxuICAgIG5neFBhdHRlcm46IFJlZ0V4cCB8IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVnZXg7XHJcbiAgICBwcml2YXRlIGxhc3RTZWxlY3Rpb25TdGFydDtcclxuICAgIHByaXZhdGUgbGFzdFNlbGVjdGlvbkVuZDtcclxuICAgIHByaXZhdGUgbGFzdFZhbHVlO1xyXG4gICAgb25QYXN0ZUhhbmRsZXI6IChlOiBDbGlwYm9hcmRFdmVudCkgPT4gdm9pZDtcclxuICAgIG9uS2V5ZG93bkhhbmRsZXI6IChlOiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoaG9zdDogRWxlbWVudFJlZiwgY29udHJvbDogTmdDb250cm9sKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgb25LZXlEb3duO1xyXG4gICAgb25JbnB1dCgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBvblBhc3RlO1xyXG4gICAgb25Ecm9wKGU6IERyYWdFdmVudCk6IHZvaWQ7XHJcbiAgICBnZXQgY3VycmVudFZhbHVlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgdmFsaWRXaXRoQ2hhbmdlO1xyXG4gICAgcHJpdmF0ZSB0ZXh0SXNWYWxpZDtcclxuICAgIGdldCBpbnB1dEVsKCk6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbn1cclxuIl19