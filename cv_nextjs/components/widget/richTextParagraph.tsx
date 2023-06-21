type RichTextParagraphProps = {
    text: string,
}

export const RichTextParagraphComponent = ({ text }: RichTextParagraphProps)  => {
    
    const parts: string[] = text.split("_");

    return <span>{
            parts.map(str_part => {
                if (str_part.includes("#")) {
                    return <strong>{ str_part.replace("#", "") }</strong>
                } else {
                    return str_part
                }
            })
        }
    </span>
}