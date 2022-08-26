import './App.css';

import { FlawLessUI, Loading, useLoading, createConfig } from 'flawless-ui'
import axios, { AxiosRequestConfig } from 'axios';
import { FC } from 'react';
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

  const isLoading = useLoading('Club/ClubGallery')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await api.post('/products/add', {})
  }

  return (
    <h1 onClick={getData}>
      <HttpFeedback 
        url='/products/add'
      />
      <Loading url="/products/add">
        {(loading: boolean) => (
          <>
            {loading ? 'loading' : 'done'}
          </>
        )}
      </Loading>
      -
      {isLoading ? '1' : '2'}
    </h1>
  )
}

export default App;
