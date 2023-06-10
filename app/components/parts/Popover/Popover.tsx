import style from './Popover.module.css';

interface Props {
  children: React.ReactNode;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const Popover = (props: Props): JSX.Element => {
  return (
    <div>
      {props.open && (
        <div
          className={style.popoverContent}
          style={{
            position: 'absolute',
            top: props.anchorEl?.getBoundingClientRect()
              .bottom,

            left: props.anchorEl?.getBoundingClientRect()
              .right,
            transform: 'translateX(-100%)',
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
