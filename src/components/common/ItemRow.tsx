import { Link, Stack } from '@mui/material';

interface Props {
  title: string;
  content?: string[] | number[];
  contentLink?: string[] | number[];
  isEmail?: boolean;
}
const ItemRow = (props: Props) => {
  const { title, content, contentLink, isEmail } = props;
  const handleClick = (item: string | number) => {
    if (isEmail) {
      window.open(`mailto:${item}`, '_blank');
    } else {
      window.open(`https://www.facebook.com/${item}`, '_blank');
    }
  };
  const handleData = () => {
    if (content) {
      return (
        <div style={{ color: 'GrayText', fontSize: 16, flex: 5 }}>
          {content.map((item: string | number, index: number) => (
            <p key={index} style={{ whiteSpace: 'pre-line' }}>
              {item}
            </p>
          ))}
        </div>
      );
    }
    return <span style={{ color: 'GrayText', fontSize: 16, flex: 5 }}>{content}</span>;
  };
  const handleDataLink = () => {
    if (contentLink) {
      return (
        <div style={{ color: 'GrayText', fontSize: 16, flex: 5 }}>
          {contentLink.map((item: string | number, index: number) => (
            <div key={index}>
              <Link
                variant="body2"
                // href={`https://www.facebook.com/${item}`}
                underline={isEmail ? 'none' : 'always'}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {isEmail ? item : `https://www.facebook.com/${item}`}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  };
  return (
    <div>
      <Stack direction="row" spacing={1} paddingX={4} paddingY={1}>
        <span style={{ color: 'black', fontSize: 16, fontWeight: '-moz-initial', flex: 1 }}>{title}</span>
        {content && handleData()}
        {contentLink && handleDataLink()}
      </Stack>
    </div>
  );
};
export default ItemRow;
