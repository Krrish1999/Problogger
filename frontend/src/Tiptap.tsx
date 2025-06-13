import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'

import Text from '@tiptap/extension-text'

// define your extension array
const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

const Tiptap = () => {
  const editor = useEditor({
  extensions: [
    Placeholder.configure({ 
        placeholder:"Tell you story",
        emptyEditorClass:
       'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none',

     }), // move Placeholder to the top
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Image.configure({ HTMLAttributes: { class: 'rounded-lg shadow-sm max-w-full h-auto my-4' } }),
    Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 hover:text-blue-800 underline cursor-pointer' } }),
   
  ],
   // use empty string to allow placeholder to appear
 })
 

  if (!editor) {
    return null
  }


  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Toggle code block
          </button>
          <button
            onClick={() => editor.chain().focus().setCodeBlock().run()}
            disabled={editor.isActive('codeBlock')}
          >
            Set code block
          </button>
     
      </BubbleMenu>


    </>
  )
  
}
export default Tiptap
