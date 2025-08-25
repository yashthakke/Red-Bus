import React, { useState } from 'react';
import '../assets/RichTextEditor.css';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw
} from 'draft-js';

export const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('16px');
  const [spellCheck, setSpellCheck] = useState(true);
  const [subject, setSubject] = useState('');
  const [recipientType, setRecipientType] = useState('user');
  const [customEmails, setCustomEmails] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const applyInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyBlockStyle = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);
    applyInlineStyle(`FONTSIZE-${size}`);
  };

  const handleFontFamilyChange = (e) => {
    const font = e.target.value.replace(/\s+/g, '_').toUpperCase();
    applyInlineStyle(`FONTFAMILY-${font}`);
  };

  const handleColorChange = (e) => {
    const color = e.target.value.toUpperCase();
    setTextColor(color);
    applyInlineStyle(color);
  };

  const handleAlignment = (alignType) => {
    applyBlockStyle(`align-${alignType}`); // ⚠️ Note: needs custom style map or block renderer
  };

  const undoChange = () => setEditorState(EditorState.undo(editorState));
  const redoChange = () => setEditorState(EditorState.redo(editorState));

  const Toupper = () => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const selectedText = contentState.getBlockMap()
      .filter((block) => {
        const key = block.getKey();
        return selection.getStartKey() <= key && key <= selection.getEndKey();
      })
      .map((block) => block.getText())
      .join('\n')
      .toUpperCase();

    const newContent = Modifier.replaceText(
      contentState,
      selection,
      selectedText,
      editorState.getCurrentInlineStyle()
    );

    setEditorState(EditorState.push(editorState, newContent, 'insert-characters'));
  };

  const clearFormatting = () => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const cleared = Modifier.replaceText(content, selection, '', new Set());
    const newEditorState = EditorState.push(editorState, cleared, 'remove-formatting');
    setEditorState(EditorState.forceSelection(newEditorState, selection));
  };

  const handleSendMail = () => {
    const content = editorState.getCurrentContent().getPlainText();
    const mailData = {
      subject,
      recipientType,
      recipients: recipientType === 'custom' ? customEmails.split(',') : [],
      body: content,
    };

    console.log("📬 Sending mail data:", mailData);
    alert('Mail sent (simulated). Check console for data.');
  };

  const customStyleFn = (styleSet) => {
    const styles = {};
    styleSet.forEach((style) => {
      if (style === 'BOLD') styles.fontWeight = 'bold';
      if (style === 'ITALIC') styles.fontStyle = 'italic';
      if (style === 'UNDERLINE') styles.textDecoration = 'underline';
      if (style === 'STRIKETHROUGH') styles.textDecoration = 'line-through';
      if (/^#([0-9A-F]{3}){1,2}$/i.test(style)) styles.color = style;
      if (style.startsWith('FONTSIZE-')) styles.fontSize = style.split('-')[1];
      if (style.startsWith('FONTFAMILY-')) {
        const font = style.replace('FONTFAMILY-', '').replace(/_/g, ' ');
        styles.fontFamily = font;
      }
      if (style === 'SUBSCRIPT') styles.verticalAlign = 'sub';
      if (style === 'SUPERSCRIPT') styles.verticalAlign = 'super';
      if (style === 'HIGHLIGHT') {
        styles.backgroundColor = 'yellow'; // or any highlight color
      }
    });
    return styles;
  };

  return (
    <div className="container py-4">
      <h2 className="editor-heading">📧 Mail Composer</h2>

      {/* Subject */}
      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter mail subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* Recipients */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <label className="form-label mb-0">Recipients</label>
        <select
          className="form-select w-auto"
          value={recipientType}
          onChange={(e) => setRecipientType(e.target.value)}
        >
          <option value="user">User</option>
          <option value="company">Company</option>
          <option value="custom">Custom Emails</option>
        </select>

        {recipientType === 'custom' && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter emails separated by comma"
            value={customEmails}
            onChange={(e) => setCustomEmails(e.target.value)}
          />
        )}
      </div>

      {/* Toolbar */}
      <div className="editor-toolbar d-flex flex-wrap gap-2 mb-3">
        <div className="btn-group">
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('BOLD')}>B</button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('ITALIC')}>I</button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('UNDERLINE')}>U</button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('STRIKETHROUGH')}>Strike</button>
          <button className="btn btn-outline-warning btn-sm" onClick={() => applyInlineStyle('HIGHLIGHT')}>Highlight</button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('SUBSCRIPT')}>Sub</button>
          <button className="btn btn-outline-dark btn-sm" onClick={() => applyInlineStyle('SUPERSCRIPT')}>Super</button>
          <button className="btn btn-outline-danger btn-sm" onClick={clearFormatting}>Clear</button>
        </div>

        {/* Font Controls */}
        <div className="d-flex align-items-center gap-2">
          <input type="color" value={textColor} onChange={handleColorChange} />
          <select className="form-select form-select-sm" onChange={handleFontFamilyChange} defaultValue="">
            <option value="" disabled>Font</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Roboto">Roboto</option>
          </select>
          <select className="form-select form-select-sm" value={fontSize} onChange={handleFontSizeChange}>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
          </select>
        </div>

        {/* Block styles */}
        <div className="btn-group">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => applyBlockStyle('header-one')}>H1</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => applyBlockStyle('header-two')}>H2</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => applyBlockStyle('unordered-list-item')}>•</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => applyBlockStyle('ordered-list-item')}>1.</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => applyBlockStyle('code-block')}>Code</button>
        </div>

        {/* Alignment */}
        <div className="btn-group">
          <button className="btn btn-outline-info btn-sm" onClick={() => handleAlignment('left')}>Left</button>
          <button className="btn btn-outline-info btn-sm" onClick={() => handleAlignment('center')}>Center</button>
          <button className="btn btn-outline-info btn-sm" onClick={() => handleAlignment('right')}>Right</button>
          <button className="btn btn-outline-info btn-sm" onClick={() => handleAlignment('justify')}>Justify</button>
        </div>

        {/* Actions */}
        <div className="btn-group">
          <button className="btn btn-secondary btn-sm" onClick={undoChange}>Undo</button>
          <button className="btn btn-secondary btn-sm" onClick={redoChange}>Redo</button>
          <button className="btn btn-secondary btn-sm" onClick={Toupper}>Upper</button>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setSpellCheck(!spellCheck)}>
            {spellCheck ? 'Disable Spellcheck' : 'Enable Spellcheck'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          customStyleFn={customStyleFn}
          placeholder="Start typing here..."
          spellCheck={spellCheck}
        />
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-outline-secondary" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Hide Preview" : "Preview"}
        </button>
        <button className="btn btn-primary" onClick={handleSendMail}>Send Mail</button>
      </div>

      {/* Preview */}
      {previewMode && (
        <div className="mt-4 p-3 border rounded bg-white shadow-sm">
          <h5>📌 Preview</h5>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Recipients:</strong> {recipientType === 'custom' ? customEmails : recipientType}</p>
          <hr />
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {editorState.getCurrentContent().getPlainText()}
          </div>
        </div>
      )}
    </div>
  );
};
