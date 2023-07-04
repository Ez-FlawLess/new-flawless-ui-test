import './App.css';

import { FlawLessUI, useLoading, createConfig, HTTP_METHODS, GlobalHttpFeedback, AlertI, useHttp } from 'flawless-ui'
import axios from 'axios';
import { FC, ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

const api = axios.create({
  baseURL: 'https://api.selfit.ir/api/Global/v1/',
})

const config = createConfig({
  axiosInstance: api,
  httpMethods: [...HTTP_METHODS, 'get'],
  components: {
    alerts: {
      success: (props: AlertI) => <div>S - {props.title} - {props.message}<button onClick={props.onClose}>close</button> {props.props?.hi}</div>,
      error: (props: AlertI) => <div>E - {props.title} - {props.message}<button onClick={props.onClose}>close</button></div>,
    }
  },
  globalHttpFeedback: true,
})

function App() {

  return (
    <div className="App">
      <FlawLessUI config={config}>
        <Test />
      </FlawLessUI>
    </div>
  );
}

export const Test: FC = props => {

  const {
    loading,
    call,
    Feedback,
    id,
  } = useHttp()
  const t = useHttp()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await call(api.get('Slider?section=Home&for=Desktop&Size=10&Page=1&Sort=Default'))
  }

  return (
    <>
      <Feedback
        // showSuccess={true}
      />
      <h1 onClick={getData}>
          {loading ? 'loading' : 'done'}
      </h1>
      <AnotherTest 
        id={id}
      />
      <GlobalHttpFeedback>
        {(fs: any) => fs.map((f: any) => (
          <h1 onClick={f.onClose}>
            hi
            {f.message}
          </h1>
        ))}
      </GlobalHttpFeedback>
    </>
  )
}

export const AnotherTest: FC<{
  id: number,
}> = props => {

  const loading = useLoading(props.id)
  const t = useHttp()

  return (
    <h1 >
        {loading ? 'loading' : 'done'}
    </h1>
  )
}

export default App;
