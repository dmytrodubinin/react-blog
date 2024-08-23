import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { addTailwindClassesToContent } from '../utils/htmlUtils';

const TextEditor = ({ onChange, initialContent }) => {
  const [content, setContent] = useState(initialContent || '');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'indent',
          'link',
          'image',
          'video',
        ]}
        placeholder="Write something amazing..."
        modules={modules}
        onChange={handleChange}
        value={content}
      />

      <div>
        <h2 className="mt-8 flex justify-center text-xl font-bold">Preview</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: addTailwindClassesToContent(content),
          }}
        ></div>
      </div>
    </div>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialContent: PropTypes.string,
};

export default TextEditor;
