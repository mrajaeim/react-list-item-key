import React from 'react';
import './style.css';
import { useUID, useUIDSeed } from 'react-uid';
import { v4 as uuidv4 } from 'uuid';

const getItemID = (unique = true) => {
  if (unique) return uuidv4();
  return 'noid';
};

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

const Example = ({ defaults, uniqueID, setUniqueID }) => {
  const [fields, setFields] = React.useState(defaults);
  const [newID, setNewID] = React.useState('no new');
  const seed = useUIDSeed();
  const userInput = () => {
    const firstItems = Array.from(
      document.querySelectorAll('.form-group:first-child input')
    );
    firstItems.forEach(
      (item) => (item.value = 'It is ' + new Date().toTimeString())
    );
  };

  const addItem = () => {
    const id = getItemID(uniqueID);
    setNewID(id);
    setFields([{ name: 'Baz', id }, ...fields]);
  };

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
                checked={uniqueID}
                onChange={(e) => {
                  setUniqueID(e.target.checked);
                }}
              />
              <span className="label-text">Generate Unique ID</span>
            </label>
          </div>
        </div>
        <div className="badge badge-primary badge-outline">
          New Field ID: {newID.split('-')[0]}
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
          {fields.map((todo, index) => (
            <Item {...todo} key={index} />
          ))}
        </form>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 font-bold bg-yellow-500 inline-block rounded p-1">
          Better <pre className="inline bg-white rounded p-[2px]">key=id</pre>
        </h3>
        <form className="form-horizontal">
          {fields.map((todo) => (
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
          {fields.map((todo) => (
            <Item {...todo} key={seed(todo)} />
          ))}
        </form>
      </div>
      <div className="divider">Read More</div>
      <a
        className="btn mr-3"
        target="_blank"
        href="https://medium.com/@mrajaeim/create-a-simple-react-app-to-master-react-list-item-keys-and-discover-best-practices-42645cc9e1f8"
      >
        Read Article
      </a>
      <a
        className="btn"
        target="_blank"
        href="https://medium.com/p/e0349aece318"
      >
        See Reference
      </a>
    </div>
  );
};

export default function App() {
  const [defaults, setDefaults] = React.useState([
    { name: 'Foo', id: uuidv4() },
    { name: 'Bar', id: uuidv4() },
  ]);
  const [uniqueID, setUniqueID] = React.useState(true);
  const [init, setInit] = React.useState(true);

  React.useEffect(() => {
    if (!init) {
      setDefaults((prev) =>
        prev.map((item) => ({ ...item, id: getItemID(uniqueID) }))
      );
    } else {
      setInit(false);
    }
  }, [uniqueID]);

  return (
    <div>
      <Example
        key={uuidv4()}
        defaults={defaults}
        uniqueID={uniqueID}
        setUniqueID={setUniqueID}
      />
    </div>
  );
}
