import { ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
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
}
