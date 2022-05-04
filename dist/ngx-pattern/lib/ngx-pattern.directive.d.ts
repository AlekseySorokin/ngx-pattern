import { ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
export declare class NgxPatternDirective implements OnChanges, OnInit, OnDestroy {
    private host;
    private control;
    private unsubscribeSubj;
    ngxPattern: RegExp | string;
    private regex;
    private lastSelectionStart;
    private lastSelectionEnd;
    private lastValue;
    constructor(host: ElementRef, control: NgControl);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private initSelectionValues;
    private onKeyDown;
    onClick(ev: Event): void;
    onInput(): void;
    private onPaste;
    onDrop(e: DragEvent): void;
    get currentValue(): string | undefined;
    private validWithChange;
    private textIsValid;
    get inputEl(): HTMLInputElement;
}
