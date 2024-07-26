import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';
import { ToolboxConfig, PasteConfig, BlockToolConstructorOptions, BlockTool } from '@editorjs/editorjs';
import { ActionConfig, UploadResponseFormat, ImageToolData, ImageConfig } from './types/types';

type ImageToolConstructorOptions = BlockToolConstructorOptions<ImageToolData, ImageConfig>;
export default class ImageTool implements BlockTool {
    /**
     * Editor.js API instance
     */
    private api;
    /**
     * Flag indicating read-only mode
     */
    private readOnly;
    /**
     * Current Block API instance
     */
    private block;
    /**
     * Configuration for the ImageTool
     */
    private config;
    /**
     * Uploader module instance
     */
    private uploader;
    /**
     * UI module instance
     */
    private ui;
    /**
     * Stores current block data internally
     */
    private _data;
    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     * @param {BlockAPI|{}} tool.block - current Block API
     */
    constructor({ data, config, api, readOnly, block }: ImageToolConstructorOptions);
    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported(): boolean;
    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox(): ToolboxConfig;
    /**
     * Available image tools
     *
     * @returns {Array}
     */
    static get tunes(): Array<ActionConfig>;
    /**
     * Renders Block content
     *
     * @public
     *
     * @returns {HTMLDivElement}
     */
    render(): HTMLDivElement;
    /**
     * Validate data: check if Image exists
     *
     * @param {ImageToolData} savedData — data received after saving
     * @returns {boolean} false if saved data is not correct, otherwise true
     * @public
     */
    validate(savedData: ImageToolData): boolean;
    /**
     * Return Block data
     *
     * @public
     *
     * @returns {ImageToolData}
     */
    save(): ImageToolData;
    /**
     * Returns configuration for block tunes: add background, add border, stretch image
     *
     * @public
     *
     * @returns TunesMenuConfig
     */
    renderSettings(): TunesMenuConfig;
    /**
     * Fires after clicks on the Toolbox Image Icon
     * Initiates click on the Select File button
     *
     * @public
     */
    appendCallback(): void;
    /**
     * Specify paste substitutes
     *
     * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
     * @returns {{tags: string[], patterns: object<string, RegExp>, files: {extensions: string[], mimeTypes: string[]}}}
     */
    static get pasteConfig(): PasteConfig;
    /**
     * Specify paste handlers
     *
     * @public
     * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
     * @param {CustomEvent} event - editor.js custom paste event
     *                              {@link https://github.com/codex-team/editor.js/blob/master/types/tools/paste-events.d.ts}
     * @returns {void}
     */
    onPaste(event: CustomEvent): Promise<void>;
    /**
     * Private methods
     * ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
     */
    /**
     * Stores all Tool's data
     *
     * @private
     *
     * @param {ImageToolData} data - data in Image Tool format
     */
    set data(data: ImageToolData);
    /**
     * Return Tool data
     *
     * @private
     *
     * @returns {ImageToolData}
     */
    get data(): ImageToolData;
    /**
     * Set new image file
     *
     * @private
     *
     * @param {object} file - uploaded file data
     */
    set image(file: {
        url: string;
    } | undefined);
    /**
     * File uploading callback
     *
     * @private
     *
     * @param {UploadResponseFormat} response - uploading server response
     * @returns {void}
     */
    onUpload(response: UploadResponseFormat): void;
    /**
     * Handle uploader errors
     *
     * @private
     * @param {string} errorText - uploading error text
     * @returns {void}
     */
    uploadingFailed(errorText: string): void;
    /**
     * Callback fired when Block Tune is activated
     *
     * @private
     *
     * @param {string} tuneName - tune that has been clicked
     * @returns {void}
     */
    tuneToggled(tuneName: keyof ImageToolData): void;
    /**
     * Set one tune
     *
     * @param {string} tuneName - {@link Tunes.tunes}
     * @param {boolean} value - tune state
     * @returns {void}
     */
    setTune(tuneName: keyof ImageToolData, value: boolean): void;
    /**
     * Show preloader and upload image file
     *
     * @param {File} file - file that is currently uploading (from paste)
     * @returns {void}
     */
    uploadFile(file: Blob): void;
    /**
     * Show preloader and upload image by target url
     *
     * @param {string} url - url pasted
     * @returns {void}
     */
    uploadUrl(url: string): void;
}
export {};
