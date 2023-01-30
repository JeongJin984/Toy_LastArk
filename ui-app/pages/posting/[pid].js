import {useRouter} from "next/router";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {Image, Table} from "semantic-ui-react";
import NavigationBar from "../../components/NavigationBar";

export default function Community() {
  const router = useRouter()
  const {pid} = router.query

  const markdown = `
# 소서리스 공략집이긴 한데....

### 테스트용 표

| S/N | Pet | Image |
|--|--|--|
| 1 | Cat |![A cat looking at you](https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=68615bab04be2077a471009ffc236509) |
| 2 | Dog |![A dog looking at you](https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg)|

다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔다음엔

- gkgkgkgk
   - gkgkgkgkgkgk
`;

  return (
    <div>
      <NavigationBar/>
      <div style={{width: "60%", marginLeft: "20%", paddingTop: "70px", wordWrap:"break-word" }}>
        <ReactMarkdown
          style={{width: "60%"}}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          children={markdown}
          components={{
            code: ({node, inline, className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            img: ({node, ...props}) => <Image style={{maxWidth: "100%", maxHeight: "100%"}} {...props} />,
            table: ({node, ...props}) => <Table style={{ width: "80%" }} size={"small"} fixed={true} celled {...props} />,
          }}
        />
      </div>
    </div>

  )
}