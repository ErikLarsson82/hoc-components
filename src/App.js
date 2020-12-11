import React, { useState, useEffect } from 'react'
import { compose, equals } from 'ramda'
import './App.css'
import data from './data.json'
import localization from './localization.json'
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const value = e => e.target.value
  
function App() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(null)
  const [changes, setChanges] = useState(null)
  const [modal, setModal] = useState(false)
  const lang = useState("en")
  
  useEffect(() => {
    setTimeout(() => {
      setSettings(data)
      setChanges(data)
      setLoading(false)
    }, 3000)
  }, [])

  const isDirty = !equals(settings, changes)
  const isClean = !isDirty
  const modalOpen = !!modal

  return (
    <div>
      <p>{ isDirty ? 'im dirty' : 'im clean'}</p>
      <Lang lang={lang} dis={modalOpen} />
      { loading
        ? <Loading />
        : (
          <React.Fragment>
            <Settings 
              lang={lang}
              changes={changes}
              setChanges={setChanges}
              dis={modalOpen}
            />
            <Button color="primary" onClick={() => setModal(true)} disabled={isClean || modalOpen}>Save</Button>
          </React.Fragment>
        )
      }
      {
        modal
          ? <span>
              <p>Im a modal</p>
              <CircularProgress />
            </span>
          : undefined
      }
    </div>
  )
}

function Loading() {
  return <p>Loading...</p>
}

function Lang(props, b, c) {
  const { dis } = props
  const [lang, setLang] = props.lang

  return (
    <div>
    <span className="opt">Language</span>
      <select value={lang} onChange={compose(setLang, value)} disabled={dis}>
        <option value="en">English</option>
        <option value="de">Deutch</option>
        <option value="sv">Svenska</option>
      </select>
    </div>
  )
}

function Settings(props) {
  const { changes, setChanges, lang, dis } = props
  const { fruit } = changes
  const [locale] = lang
  const { title, optionA, optionB, optionC } = localization[locale]

  const setFruit = value => setChanges(obj => ({ ...obj, fruit: value }))

  return (
    <div>
      <span className="opt">{ title }</span>
      <select value={fruit} onChange={compose(setFruit, value)} disabled={dis}>
        <option value="Radish">{ optionA }</option>
        <option value="Orange">{ optionB }</option>
        <option value="Cherry">{ optionC }</option>
      </select>
    </div>
  );
}

export default App;
