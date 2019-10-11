/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import {CanColor, CanColorCtor, mixinColor} from '@angular/material/core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';


/** Possible mode for a progress spinner. */
export type ProgressSpinnerMode = 'determinate' | 'indeterminate';

/**
 * Base reference size of the spinner.
 * @docs-private
 */
const BASE_SIZE = 100;

/**
 * Base reference stroke width of the spinner.
 * @docs-private
 */
const BASE_STROKE_WIDTH = 10;

// Boilerplate for applying mixins to MatProgressSpinner.
/** @docs-private */
class MatProgressSpinnerBase {
  constructor(public _elementRef: ElementRef) {}
}
const _MatProgressSpinnerMixinBase: CanColorCtor & typeof MatProgressSpinnerBase =
    mixinColor(MatProgressSpinnerBase, 'primary');

/** Default `mat-progress-spinner` options that can be overridden. */
export interface MatProgressSpinnerDefaultOptions {
  /** Diameter of the spinner. */
  diameter?: number;
  /** Width of the spinner's stroke. */
  strokeWidth?: number;
  /**
   * Whether the animations should be force to be enabled, ignoring if the current environment is
   * using NoopAnimationsModule.
   */
  _forceAnimations?: boolean;
}

/** Injection token to be used to override the default options for `mat-progress-spinner`. */
export const MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS =
    new InjectionToken<MatProgressSpinnerDefaultOptions>('mat-progress-spinner-default-options', {
      providedIn: 'root',
      factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
    });

/** @docs-private */
export function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY(): MatProgressSpinnerDefaultOptions {
  return {diameter: BASE_SIZE};
}

// .0001 percentage difference is necessary in order to avoid unwanted animation frames
// for example because the animation duration is 4 seconds, .1% accounts to 4ms
// which are enough to see the flicker described in
// https://github.com/angular/components/issues/8984
const INDETERMINATE_ANIMATION_TEMPLATE = `
 @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }
    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }
    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }
    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;

/**
 * `<mat-progress-spinner>` component.
 */
@Component({
  // moduleId: module.id,
  selector: 'mat-progress-spinner',
  exportAs: 'matProgressSpinner',
  host: {
    role: 'progressbar',
    class: 'mat-progress-spinner',
    '[class._mat-animation-noopable]': `_noopAnimations`,
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
    '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
    '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
    '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
    '[attr.mode]': 'mode',
  },
  inputs: ['color'],
  templateUrl: 'progress-spinner.html',
  styleUrls: ['progress-spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatProgressSpinner extends _MatProgressSpinnerMixinBase implements OnInit, CanColor {

  /** The diameter of the progress spinner (will set width and height of svg). */
  @Input()
  get diameter(): number { return this._diameter; }
  set diameter(size: number) {
    this._diameter = coerceNumberProperty(size);

    // If this is set before `ngOnInit`, the style root may not have been resolved yet.
    if (!this._fallbackAnimation && this._styleRoot) {
      this._attachStyleNode();
    }
  }

  /** Stroke width of the progress spinner. */
  @Input()
  get strokeWidth(): number {
    return this._strokeWidth || this.diameter / 10;
  }
  set strokeWidth(value: number) {
    this._strokeWidth = coerceNumberProperty(value);
  }

  /** Value of the progress circle. */
  @Input()
  get value(): number {
    return this.mode === 'determinate' ? this._value : 0;
  }
  set value(newValue: number) {
    this._value = Math.max(0, Math.min(100, coerceNumberProperty(newValue)));
  }

  constructor(public _elementRef: ElementRef<HTMLElement>,
              platform: Platform,
              @Optional() @Inject(DOCUMENT) private _document: any,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string,
              @Inject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS)
                  defaults?: MatProgressSpinnerDefaultOptions) {

    super(_elementRef);

    const trackedDiameters = MatProgressSpinner._diameters;

    // The base size is already inserted via the component's structural styles. We still
    // need to track it so we don't end up adding the same styles again.
    if (!trackedDiameters.has(_document.head)) {
      trackedDiameters.set(_document.head, new Set<number>([BASE_SIZE]));
    }

    this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
    this._noopAnimations = animationMode === 'NoopAnimations' &&
        (!!defaults && !defaults._forceAnimations);

    if (defaults) {
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }

      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }

  /** The radius of the spinner, adjusted for stroke width. */
  get _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }

  /** The view box of the spinner's svg element. */
  get _viewBox() {
    const viewBox = this._circleRadius * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }

  /** The stroke circumference of the svg circle. */
  get _strokeCircumference(): number {
    return 2 * Math.PI * this._circleRadius;
  }

  /** The dash offset of the svg circle. */
  get _strokeDashOffset() {
    if (this.mode === 'determinate') {
      return this._strokeCircumference * (100 - this._value) / 100;
    }

    // In fallback mode set the circle to 80% and rotate it with CSS.
    if (this._fallbackAnimation && this.mode === 'indeterminate') {
      return this._strokeCircumference * 0.2;
    }

    return null;
  }

  /** Stroke width of the circle in percent. */
  get _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }

  /**
   * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
   * We need to keep track of which elements the diameters were attached to, because for
   * elements in the Shadow DOM the style tags are attached to the shadow root, rather
   * than the document head.
   */
  private static _diameters = new WeakMap<Node, Set<number>>();
  private _diameter = BASE_SIZE;
  private _value = 0;
  private _strokeWidth: number;
  private _fallbackAnimation = false;

  /**
   * Element to which we should add the generated style tags for the indeterminate animation.
   * For most elements this is the document, but for the ones in the Shadow DOM we need to
   * use the shadow root.
   */
  private _styleRoot: Node;

  /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
  _noopAnimations: boolean;

  /** Mode of the progress circle */
  @Input() mode: ProgressSpinnerMode = 'determinate';

  ngOnInit() {
    const element = this._elementRef.nativeElement;

    // Note that we need to look up the root node in ngOnInit, rather than the constructor, because
    // Angular seems to create the element outside the shadow root and then moves it inside, if the
    // node is inside an `ngIf` and a ShadowDom-encapsulated component.
    this._styleRoot = _getShadowRoot(element, this._document) || this._document.head;
    this._attachStyleNode();

    // On IE and Edge, we can't animate the `stroke-dashoffset`
    // reliably so we fall back to a non-spec animation.
    const animationClass =
      `mat-progress-spinner-indeterminate${this._fallbackAnimation ? '-fallback' : ''}-animation`;

    element.classList.add(animationClass);
  }

  /** Dynamically generates a style tag containing the correct animation for this diameter. */
  private _attachStyleNode(): void {
    const styleRoot = this._styleRoot;
    const currentDiameter = this._diameter;
    const diameters = MatProgressSpinner._diameters;
    let diametersForElement = diameters.get(styleRoot);

    if (!diametersForElement || !diametersForElement.has(currentDiameter)) {
      const styleTag: HTMLStyleElement = this._document.createElement('style');
      styleTag.setAttribute('mat-spinner-animation', currentDiameter + '');
      styleTag.textContent = this._getAnimationText();
      styleRoot.appendChild(styleTag);

      if (!diametersForElement) {
        diametersForElement = new Set<number>();
        diameters.set(styleRoot, diametersForElement);
      }

      diametersForElement.add(currentDiameter);
    }
  }

  /** Generates animation styles adjusted for the spinner's diameter. */
  private _getAnimationText(): string {
    return INDETERMINATE_ANIMATION_TEMPLATE
        // Animation should begin at 5% and end at 80%
        .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
        .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
        .replace(/DIAMETER/g, `${this.diameter}`);
  }
}


/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
@Component({
  // moduleId: module.id,
  selector: 'mat-spinner',
  host: {
    role: 'progressbar',
    mode: 'indeterminate',
    class: 'mat-spinner mat-progress-spinner',
    '[class._mat-animation-noopable]': `_noopAnimations`,
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  },
  inputs: ['color'],
  templateUrl: 'progress-spinner.html',
  styleUrls: ['progress-spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatSpinner extends MatProgressSpinner {
  constructor(elementRef: ElementRef<HTMLElement>, platform: Platform,
              @Optional() @Inject(DOCUMENT) document: any,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string,
              @Inject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS)
                  defaults?: MatProgressSpinnerDefaultOptions) {
    super(elementRef, platform, document, animationMode, defaults);
    this.mode = 'indeterminate';
  }
}


/** Gets the shadow root of an element, if supported and the element is inside the Shadow DOM. */
export function _getShadowRoot(element: HTMLElement, _document: Document): Node | null {
  // TODO(crisbeto): see whether we should move this into the CDK
  // feature detection utilities once #15616 gets merged in.
  if (typeof window !== 'undefined') {
    const head = _document.head;

    // Check whether the browser supports Shadow DOM.
    if (head && ((head as any).createShadowRoot || head.attachShadow)) {
      const rootNode = element.getRootNode ? element.getRootNode() : null;

      // We need to take the `ShadowRoot` off of `window`, because the built-in types are
      // incorrect. See https://github.com/Microsoft/TypeScript/issues/27929.
      if (rootNode instanceof (window as any).ShadowRoot) {
        return rootNode;
      }
    }
  }

  return null;
}
