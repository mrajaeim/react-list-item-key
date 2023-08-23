import React from 'react';
import './style.css';
import { useUID, useUIDSeed } from 'react-uid';
import { v4 as uuidv4 } from 'uuid';

const Item = (props) => {
  return (
    <div className="form-group flex gap-3 mb-3">
      <label className="col-xs-4 control-label">
        {props.name}_{props.id.split('-')[0]}
      </label>
      <input type="text" className="input input-bordered input-sm w-full" />
    </div>
  );
};

const Example = () => {
  const [s, setS] = React.useState([
    { name: 'Foo', id: uuidv4() },
    { name: 'Bar', id: uuidv4() },
  ]);
  const [n, setN] = React.useState('no new');
  const [u, setU] = React.useState(true);
  const [i, setI] = React.useState(true);
  const seed = useUIDSeed();
  const userInput = () => {
    const firstItems = Array.from(
      document.querySelectorAll('.form-group:first-child input')
    );
    firstItems.forEach(
      (item) => (item.value = 'It is ' + new Date().toTimeString())
    );
  };
  const getItemID = () => {
    if (u) return uuidv4();
    return 'noid';
  };

  const addItem = () => {
    const id = getItemID();
    setN(id);
    setS([{ name: 'Baz', id }, ...s]);
  };

  React.useEffect(() => {
    if (!i) {
      setS((p) => p.map((item) => ({ ...item, id: getItemID() })));
    } else {
      setI(false);
    }
  }, [u]);

  return (
    <div>
      <div className="">
        <h1 className="font-bold text-red-500">How to use:</h1>
        <ol className="list-decimal pl-8">
          <li>
            First write something in the inputs (or{' '}
            <a
              href="#"
              onClick={userInput}
              className="badge badge-error !text-white"
            >
              simulate it
            </a>
            ).
          </li>
          <li>
            Then hit <em className="text-sky-600">Add item</em> and see what
            happens…
          </li>
        </ol>
      </div>
      <div className="divider">Setting</div>
      <div className="flex justify-start items-center contents-center gap-3 flex-wrap">
        <div className="min-w-[160px]">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={u}
                onChange={(e) => {
                  setU(e.target.checked);
                }}
              />
              <span className="label-text">Generate Unique ID</span>
            </label>
          </div>
        </div>
        <div className="badge badge-primary badge-outline">
          New Field ID: {n}
        </div>
      </div>
      <div className="divider">Demo</div>
      <button className="btn !bg-sky-500 !text-white mb-7" onClick={addItem}>
        <b>Add item</b> to the beginning of the list
      </button>

      <div className="mb-8">
        <h3 className="mb-4 font-bold bg-red-500 inline-block rounded p-1">
          Dangerous{' '}
          <pre className="inline bg-white rounded p-[2px]">key=index</pre>
        </h3>
        <form className="form-horizontal">
          {s.map((todo, index) => (
            <Item {...todo} key={index} />
          ))}
        </form>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 font-bold bg-yellow-500 inline-block rounded p-1">
          Better <pre className="inline bg-white rounded p-[2px]">key=id</pre>
        </h3>
        <form className="form-horizontal">
          {s.map((todo) => (
            <Item {...todo} key={todo.id} />
          ))}
        </form>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 font-bold bg-emerald-500 inline-block rounded p-1">
          Much better{' '}
          <pre className="inline bg-white rounded p-[2px]">key=seed(item)</pre>
        </h3>
        <form className="form-horizontal">
          {s.map((todo) => (
            <Item {...todo} key={seed(todo)} />
          ))}
        </form>
      </div>
      <div className="divider">Read More</div>
      <a href="https://medium.com/p/e0349aece318">Read Article</a>
      <br />
      <br />
      <a href="https://medium.com/p/e0349aece318">Reference</a>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Example />
    </div>
  );
}
