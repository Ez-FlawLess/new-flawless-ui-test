import './App.css';

import { FlawLessUI, Loading, useLoading } from 'flawless-ui'
import axios from 'axios';
import { FC } from 'react';
import { useEffect } from 'react';

const api = axios.create({
  baseURL: 'https://api.selfit.ir/api/Global/v1/'
})

function App() {
  return (
    <div className="App">
      <FlawLessUI axiosInstance={api}>
        <Test />
      </FlawLessUI>
    </div>
  );
}

export const Test: FC = props => {

  const isLoading = useLoading()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await api.get('Club/ClubGallery?clubId=4c663d25-76de-ec11-8c90-00505681e7a8')
  }

  return (
    <h1 onClick={getData}>
      <Loading url="Club/ClubGallery">
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
