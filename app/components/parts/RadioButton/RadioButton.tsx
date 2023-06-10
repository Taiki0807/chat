interface Props {
  children: React.ReactNode;
  value: string;
  name: string;
  // The 'event' argument is not used in this function but is required for the event handler signature.
  onChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const RadioButton = (props: Props): JSX.Element => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          id={props.value}
        />
        {props.children}
      </label>
    </div>
  );
};
