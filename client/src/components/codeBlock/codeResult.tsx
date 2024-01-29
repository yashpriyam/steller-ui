import { FC, useContext, useEffect, useState } from 'react';
import { CodeDataContext } from './CodeDataProvider';

const CodeResult: FC = () => {
  const [src, setSrc] = useState<string>('');
  const { html = "", css = "", js = "" } = useContext(
    CodeDataContext
  ) as DataContextProps;

  const srcCode: string = `
        <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
        </html>
    `;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc(srcCode);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js, srcCode]);

  return (
    <div className='code-block-result-container' style={{backgroundColor: 'white'}}>
      <iframe
        srcDoc={src}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default CodeResult;
