import logo from './logo.svg';
import './App.css';   // .은 같은 폴더를 의미. 형식이 같은 파일을 import할 때는 파일명 뒤에 확장자를 굳이 적지 않아도 됨

import {useState} from 'react'; //  state를 사용하기 위해서 useState를 import한다.
                                // 여기서 state란, 컴포넌트 내부에서 어떤 값의 변화가 생겼을 때, 컴포넌트를 다시 실행시켜서 변경된 동작을 return하게 한다.
                                // props와의 차이점으로는, props는 사용자가 직접 입력을 바꿔야 동작이 바뀌는데, state는 컴포넌트 내부에서 값이 변화해서 동작이 바뀌는 것이다.


function Header(props) // 사용자가 만든 컴포넌트에 속성을 추가하고 싶다면, 매개로 props를 사용한다. // header와 같이 소문자 tag는 html 기본 tag이기 때문에, 사용자 정의 tag명은 무조건 대문자로 시작해야한다.
{
  // props를 사용할 때는 중괄호를 꼭 써야한다. props뒤에는 본인이 원하는 속성 이름을 지어주면 된다.
  return <header>
    <h1><a href="/" onClick={function(event){ // function(event){} 대신에 (event)=>{}로 해도 된다.
      event.preventDefault();   // 해당 코드는, a tag의 기본 동작을 방지하는 역할, 따라서, 해당하는 부분을 클릭해도 지정된 주소로 이동하지 않는다.
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>// return 값으로 html코드를 넣어준다.

}                   // 이렇게 만든 사용자 정의 tag를 ""컴포넌트 component"" 라고 부른다

function Nav(props)
{
  const lis = []
  for(let i=0; i<props.topics.length; i++)
  {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));    // event.target은 해당 event를 유빌시킨 tag를 가리킨다.
                                                // event.target.id를 그대로 쓰게 되면 본문에서 setId값이 문자값으로 받아진다.
                                                // 그 이유는, 위 a tag에서, 정수값 t.id는 속성으로 사용될 때, 문자로 넘겨지기 때문이다.
                                                // 따라서, 문자를 숫자로 바꿔주는 Number를 사용한다.
      }}>{t.title}</a>
      </li>) // 동적으로 만들어지는 props들은 각각의 key값을 가져야 한다. 그리고 그 값은 해당 반복문 안에서는 고유해야한다. ( 코드 전체로 볼 떄는 고유하지 않아도 된다.)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props)
{
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}


function Create(props)
{
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);

    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props)  // 기존의 값이 value에 주입 될 때는 props 값을 state로 바꾼다.
{
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);

    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}


function App() {
  const [mode, setMode] = useState('WELCOME');  // useState는 크기 2의 배열형태인데, index 1번은 샅태의 값을 읽을 때 쓰는 데이터, index 2번은 그 값을 바꾸는 함수.
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html' , body:'html is ...'},
    {id:2, title:'css' , body:'css is ...'},
    {id:3, title:'javascript' , body:'javascript is ...'}
  ]);

  let content = null;
  let contextControl = null;

  if(mode === 'WELCOME')
  {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }
  else if(mode === 'READ')
  {
    let title, body = null;
    for(let i=0; i<topics.length; i++)
      if(topics[i].id === id)
      {
        title = topics[i].title;
        body = topics[i].body;
      }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
    <li><a href={"/update/"+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics =[]
      for(let i=0; i<topics.length; i++)
      {
        if(topics[i].id != id)
        {
          newTopics.push(topics[i]);
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }
    }}/></li>

    </> // 빈 tag는 단지 그룹핑하기 위한 용도로
  }
  else if(mode === 'CREATE')
  {
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic); // state가 string, number, boolen등의 기본형의 데이터를 가진다면 바로 수성이 가능하지만, 지금과 같이 배열이나 그러한 데이터형을 가진다면 해당 데이터의 복사본을 만들고 그것을 활용하여 수종해야 한다.
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  else if(mode === 'UPDATE')
  {
    let title, body = null;
    for(let i=0; i<topics.length; i++)
      if(topics[i].id === id)
      {
        title = topics[i].title;
        body = topics[i].body;
      }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++)
      {
        if(newTopics[i].id === id)
        {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return (
    <div className="App">
      <Header title='WEB' onChangeMode={function() {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
      <li><a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      {contextControl}
      </ul>
    </div>
  );// Nav에서 중괄호를 생략한다면 topics 문자 그 자체로 인식한다. 떄문에 동적인 움직임을 바란다면 중괄호를 추가한다.
}

export default App;
