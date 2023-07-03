import './App.css';

import { FlawLessUI, Loading, useLoading, createConfig, HTTP_METHODS, HttpFeedback, AlertI, useHttp } from 'flawless-ui'
import axios from 'axios';
import { FC, ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

const secondaryApi = axios.create({
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
  }
})

function App() {

  return (
    <div className="App">
      <FlawLessUI config={config}>
        <Test />
      </FlawLessUI>2
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
    </>
  )
}

export const AnotherTest: FC<{
  id: number,
}> = props => {

  const loading = useLoading(props.id)

  return (
    <h1 >
        {loading ? 'loading' : 'done'}
    </h1>
  )
}

export default App;
