import React from 'react';
import './App.css';
import './FullWidthTabs.js';
import FullWidthTabs from './FullWidthTabs.js';

export default function App() {
  const [data, setData] = React.useState({});
  const [tab, setTab] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api');
      const json = await response.json();
      setData(json);
      setTab(json.response[0].channel.label);
    }

    fetchData();
  }, []);

  if (!data.response) {
    return <SplashScreen />;
  }

  const empty = { items: [] };
  const tv = (data.response || []).map(x => {
    const tmp = x.items
    .sort((a, b) => compareDates(new Date(a.startDate), new Date(b.startDate)))
    .filter(a => isDateActual(new Date(a.startDate)));

    return tmp
      .map((item, i) => {
        const isActive = isDateActive(item, tmp[i + 1]);
        return <Item key={i} item={item} isActive={isActive} />
      });
  });
    /*
  const items = tv
    .map((item, i) => {
      const isActive = isDateActive(item, tv[i + 1]);
      return <Item key={i} item={item} isActive={isActive} />
    });
*/
  const tabs = (data.response || []).map(item => item.channel.label);

  return <FullWidthTabs items={tv} tabs={tabs} />;
/*
  return (
    <div className="container">
      <nav>
        <ul>
          { data.response.map(x => x.channel).map((channel, i) => {
            return <li key={i}>
              <button
                className={tab === channel.label ? 'active' : ''}
                onClick={setTab.bind(null, channel.label)}>{channel.label}</button>
            </li>
          })}
        </ul>
      </nav>
      <ul>
        {tv
          .map((item, i) => {
            const isActive = isDateActive(item, tv[i + 1]);
            return <Item key={i} item={item} isActive={isActive} />
          })}
      </ul>
    </div>
  );*/
}

function Item({ item, isActive }) {
  const classList = ['Item', isActive ? 'active' : ''];
  return (
    <div className={classList.join(' ')}>
      <div className="date">{new Date(item.startDate).toLocaleString('hu-HU', { hour: 'numeric', minute: 'numeric', hour12: false })}</div>
      <div className="name">{item.name}</div>
    </div>
  );
}

function SplashScreen() {
  return <div className="Splashscreen container">
    <div className="loading">
      <div>Egy pillanat ...</div>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  </div>;
}

function compareDates(d1, d2) {
  return d1.getTime() - d2.getTime();
}

function isDateActual(d) {
  const now = new Date();
  now.setHours(now.getHours() - 3);

  return d.getTime() > now.getTime();
}

function isDateActive(x, y) {
  if (!x || !y) {
    return false;
  }

  const d1 = new Date(x.startDate).getTime();
  const d2 = new Date(y.startDate).getTime();
  const now = new Date().getTime();

  return d1 <= now && now < d2;
}

