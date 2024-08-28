/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'cropperjs' {
  export declare const ACTION_MOVE = 'move';

  export declare const ACTION_NONE = 'none';

  export declare const ACTION_RESIZE_EAST = 'e-resize';

  export declare const ACTION_RESIZE_NORTH = 'n-resize';

  export declare const ACTION_RESIZE_NORTHEAST = 'ne-resize';

  export declare const ACTION_RESIZE_NORTHWEST = 'nw-resize';

  export declare const ACTION_RESIZE_SOUTH = 's-resize';

  export declare const ACTION_RESIZE_SOUTHEAST = 'se-resize';

  export declare const ACTION_RESIZE_SOUTHWEST = 'sw-resize';

  export declare const ACTION_RESIZE_WEST = 'w-resize';

  export declare const ACTION_ROTATE = 'rotate';

  export declare const ACTION_SCALE = 'scale';

  export declare const ACTION_SELECT = 'select';

  export declare const ACTION_TRANSFORM = 'transform';

  export declare const ATTRIBUTE_ACTION = 'action';

  declare class Cropper {
    static version: string;

    container: Element;

    element: HTMLImageElement | HTMLCanvasElement;

    options: CropperOptions;
    constructor(
      element: HTMLImageElement | HTMLCanvasElement | string,
      options?: CropperOptions
    );
    getCropperCanvas(): CropperCanvas | null;
    getCropperImage(): CropperImage | null;
    getCropperSelection(): CropperSelection | null;
    getCropperSelections(): NodeListOf<CropperSelection> | null;
  }

  export default Cropper;

  export declare const CROPPER_CANVAS: string;

  export declare const CROPPER_CROSSHAIR: string;

  export declare const CROPPER_GIRD: string;

  export declare const CROPPER_HANDLE: string;

  export declare const CROPPER_IMAGE: string;

  export declare const CROPPER_SELECTION: string;

  export declare const CROPPER_SHADE: string;

  export declare const CROPPER_VIEWER: string;

  export declare class CropperCanvas extends CropperElement_2 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_2 extends CropperElement_2_2 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_2_2 extends CropperElement_3_2 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_3 extends CropperElement_2_3 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_3_2 extends CropperElement_2_3_2 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_4 extends CropperElement_2_4 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  declare class CropperCanvas_5 extends CropperElement_2_2_2 {
    static $name: string;

    static $version: string;

    protected $action: string;

    protected $onPointerDown: EventListener | null;

    protected $onPointerMove: EventListener | null;

    protected $onPointerUp: EventListener | null;

    protected $onWheel: EventListener | null;

    protected readonly $pointers: Map<number, any>;

    protected $style: string;

    protected $wheeling: boolean;

    background: boolean;

    disabled: boolean;

    scaleStep: number;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $bind(): void;
    protected $handlePointerDown(event: Event): void;
    protected $handlePointerMove(event: Event): void;
    protected $handlePointerUp(event: Event): void;
    protected $handleWheel(event: Event): void;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action: string): this;
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    protected $unbind(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
  }

  export declare class CropperCrosshair extends CropperElement_8 {
    static $name: string;

    static $version: string;

    protected $style: string;

    centered: boolean;

    slottable: boolean;

    themeColor: string;
    protected static get observedAttributes(): string[];
  }

  export declare class CropperElement extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_2_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_3 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_3_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;
    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_4 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;
    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_2_5 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_3 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_3_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_4 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_4_2 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_5 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_6 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_7 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;
    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_8 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;
    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  declare class CropperElement_9 extends HTMLElement {
    static $name: string;

    static $version: string;

    protected $style?: string;

    protected $template?: string;

    shadowRootMode: ShadowRootMode;

    slottable: boolean;

    themeColor?: string;

    constructor();
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(
      name?: string | ElementDefinitionOptions,
      options?: ElementDefinitionOptions
    ): void;
    protected static get observedAttributes(): string[];
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles: string): CSSStyleSheet | HTMLStyleElement;
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type: string, detail?: unknown, options?: CustomEventInit): boolean;
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot(): ShadowRoot;
    protected $getTagNameOf(name: string): string;
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback?: () => void): Promise<void>;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $setStyles(properties: Record<string, any>): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected get $sharedStyle(): string;
  }

  export declare class CropperGrid extends CropperElement_7 {
    static $name: string;

    static $version: string;

    protected $style: string;

    bordered: boolean;

    columns: number;

    covered: boolean;

    rows: number;

    slottable: boolean;

    themeColor: string;
    protected static get observedAttributes(): string[];
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $render(): void;
    protected connectedCallback(): void;
  }

  export declare class CropperHandle extends CropperElement_5 {
    static $name: string;

    static $version: string;

    protected $onCanvasCropEnd: EventListener | null;

    protected $onCanvasCropStart: EventListener | null;

    protected $style: string;

    action: string;

    plain: boolean;

    slottable: boolean;

    themeColor: string;
    protected static get observedAttributes(): string[];
  }

  export declare class CropperImage extends CropperElement_3 {
    static $name: string;

    static $version: string;

    protected $actionStartTarget: EventTarget | null;

    readonly $image: HTMLImageElement;

    protected $matrix: number[];

    protected $onCanvasAction: EventListener | null;

    protected $onCanvasActionEnd: EventListener | null;

    protected $onCanvasActionStart: EventListener | null;

    protected $onLoad: EventListener | null;

    protected $style: string;

    initialCenterSize: string;

    rotatable: boolean;

    scalable: boolean;

    skewable: boolean;

    slottable: boolean;

    translatable: boolean;
    protected static get observedAttributes(): string[];
    /**
     * Aligns the image to the center of its parent element.
     * @param {string} [size] The size of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $center(size?: string): this;
    /**
     * Retrieves the current transformation matrix being applied to the element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
     * @returns {Array} Returns the readonly transformation matrix.
     */
    $getTransform(): number[];
    protected $handleAction(event: Event | CustomEvent): void;
    protected $handleLoad(): void;
    /**
     * Moves the image.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the image to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Defers the callback to execute after successfully loading the image.
     * @param {Function} [callback] The callback to execute after successfully loading the image.
     * @returns {Promise} Returns a promise that resolves to the image element.
     */
    $ready(
      callback?: (image: HTMLImageElement) => unknown
    ): Promise<HTMLImageElement>;
    /**
     * Resets the current transform to the initial identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $resetTransform(): this;
    /**
     * Rotates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
     * @param {number|string} angle The rotation angle (in radians).
     * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $rotate(angle: number | string, x?: number, y?: number): this;
    /**
     * Scales the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
     * @param {number} x The scaling factor in the horizontal direction.
     * @param {number} [y] The scaling factor in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $scale(x: number, y?: number): this;
    /**
     * Resets (overrides) the current transform to the specific identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
     * @param {number|Array} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $setTransform(
      a: number | number[],
      b?: number,
      c?: number,
      d?: number,
      e?: number,
      f?: number
    ): this;
    /**
     * Skews the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number|string} x The skewing angle in the horizontal direction.
     * @param {number|string} [y] The skewing angle in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $skew(x: number | string, y?: number | string): this;
    /**
     * Transforms the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $transform(
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number
    ): this;
    /**
     * Translates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
     * @param {number} x The translating distance in the horizontal direction.
     * @param {number} [y] The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $translate(x: number, y?: number): this;
    /**
     * Zooms the image.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_2);
    protected get $canvas(): CropperCanvas_2;
  }

  declare class CropperImage_2 extends CropperElement_2_5 {
    static $name: string;

    static $version: string;

    protected $actionStartTarget: EventTarget | null;

    readonly $image: HTMLImageElement;

    protected $matrix: number[];

    protected $onCanvasAction: EventListener | null;

    protected $onCanvasActionEnd: EventListener | null;

    protected $onCanvasActionStart: EventListener | null;

    protected $onLoad: EventListener | null;

    protected $style: string;

    initialCenterSize: string;

    rotatable: boolean;

    scalable: boolean;

    skewable: boolean;

    slottable: boolean;

    translatable: boolean;
    protected static get observedAttributes(): string[];
    /**
     * Aligns the image to the center of its parent element.
     * @param {string} [size] The size of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $center(size?: string): this;
    /**
     * Retrieves the current transformation matrix being applied to the element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
     * @returns {Array} Returns the readonly transformation matrix.
     */
    $getTransform(): number[];
    protected $handleAction(event: Event | CustomEvent): void;
    protected $handleLoad(): void;
    /**
     * Moves the image.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the image to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    /**
     * Defers the callback to execute after successfully loading the image.
     * @param {Function} [callback] The callback to execute after successfully loading the image.
     * @returns {Promise} Returns a promise that resolves to the image element.
     */
    $ready(
      callback?: (image: HTMLImageElement) => unknown
    ): Promise<HTMLImageElement>;
    /**
     * Resets the current transform to the initial identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $resetTransform(): this;
    /**
     * Rotates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
     * @param {number|string} angle The rotation angle (in radians).
     * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $rotate(angle: number | string, x?: number, y?: number): this;
    /**
     * Scales the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
     * @param {number} x The scaling factor in the horizontal direction.
     * @param {number} [y] The scaling factor in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $scale(x: number, y?: number): this;
    /**
     * Resets (overrides) the current transform to the specific identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
     * @param {number|Array} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $setTransform(
      a: number | number[],
      b?: number,
      c?: number,
      d?: number,
      e?: number,
      f?: number
    ): this;
    /**
     * Skews the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number|string} x The skewing angle in the horizontal direction.
     * @param {number|string} [y] The skewing angle in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $skew(x: number | string, y?: number | string): this;
    /**
     * Transforms the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $transform(
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number
    ): this;
    /**
     * Translates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
     * @param {number} x The translating distance in the horizontal direction.
     * @param {number} [y] The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $translate(x: number, y?: number): this;
    /**
     * Zooms the image.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    protected attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_5);
    protected get $canvas(): CropperCanvas_5;
  }

  export declare interface CropperOptions {
    container?: Element | string;
    template?: string;
  }

  export declare class CropperSelection extends CropperElement_6 {
    private $initialSelection;

    static $name: string;

    static $version: string;

    protected $action: string;

    protected $actionStartTarget: EventTarget | null;

    protected $changing: boolean;

    protected $onCanvasAction: EventListener | null;

    protected $onCanvasActionEnd: EventListener | null;

    protected $onCanvasActionStart: EventListener | null;

    protected $onDocumentKeyDown: EventListener | null;

    protected $style: string;

    active: boolean;

    aspectRatio: number;

    dynamic: boolean;

    height: number;

    initialAspectRatio: number;

    initialCoverage: number;

    keyboard: boolean;

    linked: boolean;

    movable: boolean;

    multiple: boolean;

    outlined: boolean;

    precise: boolean;

    resizable: boolean;

    width: number;

    x: number;

    y: number;

    zoomable: boolean;
    protected static get observedAttributes(): string[];
    /**
     * Aligns the selection to the center of its parent element.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $center(): this;
    /**
     * Changes the position and/or size of the selection.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @param {number} [aspectRatio] The new aspect ratio for this change only.
     * @param {number} [_force] Force change.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $change(
      x: number,
      y: number,
      width?: number,
      height?: number,
      aspectRatio?: number,
      _force?: boolean
    ): this;
    /**
     * Clears the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $clear(): this;
    protected $createSelection(): CropperSelection;
    protected $getSelections(): CropperSelection[];
    protected $handleAction(event: Event): void;
    protected $handleActionEnd(): void;
    protected $handleActionStart(event: Event): void;
    protected $handleKeyDown(event: Event): void;
    protected $initSelection(center?: boolean, resize?: boolean): void;
    /**
     * Moves the selection.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the selection to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $removeSelection(selection?: CropperSelection): void;
    /**
     * Refreshes the position or size of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $render(): this;
    /**
     * Resets the selection to its initial position and size.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $reset(): this;
    /**
     * Adjusts the size the selection on a specific side or corner.
     * @param {string} action Indicates the side or corner to resize.
     * @param {number} [offsetX] The horizontal offset of the specific side or corner.
     * @param {number} [offsetY] The vertical offset of the specific side or corner.
     * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $resize(
      action: string,
      offsetX?: number,
      offsetY?: number,
      aspectRatio?: number
    ): this;
    /**
     * Generates a real canvas element, with the image (selected area only) draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    /**
     * Zooms the selection.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_4);
    protected get $canvas(): CropperCanvas_4;
  }

  declare class CropperSelection_2 extends CropperElement_4_2 {
    private $initialSelection;

    static $name: string;

    static $version: string;

    protected $action: string;

    protected $actionStartTarget: EventTarget | null;

    protected $changing: boolean;

    protected $onCanvasAction: EventListener | null;

    protected $onCanvasActionEnd: EventListener | null;

    protected $onCanvasActionStart: EventListener | null;

    protected $onDocumentKeyDown: EventListener | null;

    protected $style: string;

    active: boolean;

    aspectRatio: number;

    dynamic: boolean;

    height: number;

    initialAspectRatio: number;

    initialCoverage: number;

    keyboard: boolean;

    linked: boolean;

    movable: boolean;

    multiple: boolean;

    outlined: boolean;

    precise: boolean;

    resizable: boolean;

    width: number;

    x: number;

    y: number;

    zoomable: boolean;
    protected static get observedAttributes(): string[];
    /**
     * Aligns the selection to the center of its parent element.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $center(): this;
    /**
     * Changes the position and/or size of the selection.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @param {number} [aspectRatio] The new aspect ratio for this change only.
     * @param {number} [_force] Force change.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $change(
      x: number,
      y: number,
      width?: number,
      height?: number,
      aspectRatio?: number,
      _force?: boolean
    ): this;
    /**
     * Clears the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $clear(): this;
    protected $createSelection(): CropperSelection_2;
    protected $getSelections(): CropperSelection_2[];
    protected $handleAction(event: Event): void;
    protected $handleActionEnd(): void;
    protected $handleActionStart(event: Event): void;
    protected $handleKeyDown(event: Event): void;
    protected $initSelection(center?: boolean, resize?: boolean): void;
    /**
     * Moves the selection.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $move(x: number, y?: number): this;
    /**
     * Moves the selection to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $moveTo(x: number, y?: number): this;
    protected $propertyChangedCallback(
      name: string,
      oldValue: unknown,
      newValue: unknown
    ): void;
    protected $removeSelection(selection?: CropperSelection_2): void;
    /**
     * Refreshes the position or size of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $render(): this;
    /**
     * Resets the selection to its initial position and size.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $reset(): this;
    /**
     * Adjusts the size the selection on a specific side or corner.
     * @param {string} action Indicates the side or corner to resize.
     * @param {number} [offsetX] The horizontal offset of the specific side or corner.
     * @param {number} [offsetY] The vertical offset of the specific side or corner.
     * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $resize(
      action: string,
      offsetX?: number,
      offsetY?: number,
      aspectRatio?: number
    ): this;
    /**
     * Generates a real canvas element, with the image (selected area only) draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options?: {
      width?: number;
      height?: number;
      beforeDraw?: (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
      ) => void;
    }): Promise<HTMLCanvasElement>;
    /**
     * Zooms the selection.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $zoom(scale: number, x?: number, y?: number): this;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_3_2);
    protected get $canvas(): CropperCanvas_3_2;
  }

  export declare class CropperShade extends CropperElement_4 {
    static $name: string;

    static $version: string;

    protected $onCanvasActionEnd: EventListener | null;

    protected $onCanvasActionStart: EventListener | null;

    protected $onCanvasChange: EventListener | null;

    protected $style: string;

    height: number;

    slottable: boolean;

    themeColor: string;

    width: number;

    x: number;

    y: number;
    protected static get observedAttributes(): string[];
    /**
     * Changes the position and/or size of the shade.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $change(x: number, y: number, width?: number, height?: number): this;
    /**
     * Refreshes the position or size of the shade.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $render(): this;
    /**
     * Resets the shade to its initial position and size.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $reset(): this;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_3);
    protected get $canvas(): CropperCanvas_3;
  }

  export declare class CropperViewer extends CropperElement_9 {
    static $name: string;

    static $version: string;

    protected $onSelectionChange: EventListener | null;

    protected $onSourceImageLoad: EventListener | null;

    protected $onSourceImageTransform: EventListener | null;

    protected $scale: number;

    protected $style: string;

    resize: string;

    selection: string;

    slottable: boolean;
    protected static get observedAttributes(): string[];
    protected $handleSelectionChange(event: Event): void;
    protected $handleSourceImageLoad(): void;
    protected $handleSourceImageTransform(event?: Event): void;
    protected $render(selection?: Selection_2, matrix?: number[]): void;
    protected $transformImageByOffset(
      matrix: number[],
      x: number,
      y: number
    ): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected set $canvas(element: CropperCanvas_2_2);
    protected get $canvas(): CropperCanvas_2_2;
    protected set $image(element: CropperImage_2);
    protected get $image(): CropperImage_2;
    set $selection(element: CropperSelection_2);
    get $selection(): CropperSelection_2;
    protected set $sourceImage(element: CropperImage_2);
    protected get $sourceImage(): CropperImage_2;
  }

  export declare const DEFAULT_TEMPLATE: string;
}
