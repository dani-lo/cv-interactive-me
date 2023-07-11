type RichTextParagraphProps = {
    text: string,
}

export const RichTextParagraphComponent = ({ text }: RichTextParagraphProps)  => {
    
    const parts: string[] = text.split("_");

    return <span>{
            parts.map((str_part, i) => {

                if (str_part.includes("#")) {
                    return <strong key={ i }>{ str_part.replace("#", "") }</strong>
                } else {
                    return <span key={ i }>str_part</span>
                }
            })
        }
    </span>
}