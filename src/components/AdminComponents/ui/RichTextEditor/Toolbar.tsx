import {
    Bold,
    Italic,
    Underline,
    ListOrdered,
    List,
    Strikethrough,
    Subscript,
    Superscript,
} from 'lucide-react'
import { ToolbarBtn } from './ToolbarBtn'
import { Editor } from '@tiptap/react'

interface Props { 
    editor: Editor | null 
}

export function Toolbar({ editor }: Props) {

    if (!editor) {
        return null
    }

    return <div className='bg-gray-300 h-[2.5rem] flex items-center border border-gray-500 rounded-[0.5rem] px-[1rem]'>
        <ToolbarBtn isActive={editor.isActive('bold')} Icon={Bold} onClick={() => {editor.chain().focus().toggleBold().run()}}/>
        <ToolbarBtn isActive={editor.isActive('italic')} Icon={Italic} onClick={() => {editor.chain().focus().toggleItalic().run()}}/>
        <ToolbarBtn isActive={editor.isActive('underline')} Icon={Underline} onClick={() => {editor.chain().focus().toggleUnderline().run()}}/>
        <ToolbarBtn isActive={editor.isActive('strike')} Icon={Strikethrough} onClick={() => {editor.commands.toggleStrike()}}/>
        <ToolbarBtn isActive={editor.isActive('bulletList')} Icon={List} onClick={() => {editor.commands.toggleBulletList()}}/>
        <ToolbarBtn isActive={editor.isActive('orderedList')} Icon={ListOrdered} onClick={() => {editor.commands.toggleOrderedList()}}/>
        <ToolbarBtn isActive={editor.isActive('subscript')} Icon={Subscript} onClick={() => {editor.chain().focus().toggleSubscript().run()}}/>
        <ToolbarBtn isActive={editor.isActive('superscript')} Icon={Superscript} onClick={() => {editor.chain().focus().toggleSuperscript().run()}}/>
    </div>
}
