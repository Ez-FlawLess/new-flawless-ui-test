import './App.css';

<<<<<<< HEAD
import { FlawLessUI, Loading, useLoading, createConfig, HTTP_METHODS, HttpFeedback, AlertI, useHttp } from 'flawless-ui'
import axios from 'axios';
import { FC, ReactElement, ReactNode } from 'react';
=======
import { FlawLessUI, Loading, useLoading, createConfig } from 'flawless-ui'
import axios, { AxiosRequestConfig } from 'axios';
import { FC } from 'react';
>>>>>>> 48382d6ba3034c249c11a591ebd2791dc6a3ccb9
import { useEffect } from 'react';
import { HttpFeedback } from 'flawless-ui';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

const secondaryApi = axios.create({
  baseURL: 'https://api.selfit.ir/api/Global/v1/',
})

const config = createConfig({
  axiosInstance: {
    instance: api,
    onConfig: (d: AxiosRequestConfig<any>) => {
      console.log('data config')
      return d
    },
  },
  secondaryAxiosInstances: [{
    instance: secondaryApi,
    onConfig: (d: AxiosRequestConfig<any>) => {
      console.log('data config')
      return d
    },
  }],
  components: {
    alerts: {
      success: (props: any) => <h1>{props.message}</h1>,
      error: (props: any) => <h1>{props.message}</h1>,
    },
  },
  httpTimer: 5000,
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
