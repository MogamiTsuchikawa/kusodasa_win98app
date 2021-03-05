import React,{useState} from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import {Container,Col,Row} from 'react-bootstrap';

function App() {
  const windowStyle = {
    "height": "100%"
  }
  const bodyStyle = {
    "width": "calc(100% - 5px)",
    "height": "calc(100vh - 45px)"
  }
  const [checkboxs,setCheckboxs] = useState<string[]>([]);
  const [result,setResult] = useState<string[]>();
  const [textarea,setTextarea] = useState("完全にハードウェアを学ぶ電気工学科");
  const textareaOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  }
  const checkBonOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(checkboxs.includes(e.target.value)){
      console.log(e.target.value + ":OFF");
      setCheckboxs(checkboxs.filter(item => item !== e.target.value))
    }else{
      console.log(e.target.value + ":ON");
      setCheckboxs([...checkboxs,e.target.value]);
    }
  }
  const checkStart = () => {
    let count = ( textarea.match( new RegExp( "完全に", "g" ) ) || [] ).length ;
    let rtn:string[] = [];
    rtn.push("「完全に」の登場回数："+String(count)+"回");
    count = ( textarea.match( new RegExp( "いやちがうんすよ", "g" ) ) || [] ).length ;
    count += ( textarea.match( new RegExp( "いやちがうんですよ", "g" ) ) || [] ).length ;
    if(checkboxs.includes("iyachigaun"))rtn.push("「いやちがうんすよ」の登場回数："+String(count)+"回");
    if(textarea.length/count<30)rtn.push("最上土川の文章ではありません");
    else rtn.push("最上土川の文章です");
    setResult(rtn);
  }
  return (
    <div className="App window" style={windowStyle}>
      <TitleBar title="ｸｿﾀﾞｻ　ﾃﾞｼﾞｸﾘ  完全にﾁｪｯｶｰ" />
      <div className="window-body" style={bodyStyle}>
        <Container fluid>
          <Row>
          <p>テキストボックス内の文章が最上土川のものかチェックします。</p>
          </Row>
          <Row>
            <Col>
              <textarea name="maintext" id="maintext" cols={80} rows={25} value={textarea} onChange={textareaOnChange}></textarea>
            </Col>
            <Col>
              <Row>
                <p>オプション</p>
              </Row>
              <Row>
              <div className="field-row">
                <input type="checkbox" id="iyachigaun" value="iyachigaun" onChange={checkBonOnChange}/>
                <label htmlFor="iyachigaun">"いやちがうんすよ"も検索する</label>
              </div><br/>
              <div className="field-row">
                <input type="checkbox" disabled id="twitter" value="twitter" onChange={checkBonOnChange}/>
                <label htmlFor="twitter">Twitterに投稿する</label>
              </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <button onClick={checkStart}>チェック処理を開始</button>
          </Row>
          {result !== undefined &&
          <>
            {result.map(r => (
              <Row>{r}</Row>
            ))}
          </>
          }
        </Container>
        
      </div>
    </div>
  );
}

export default App;
