import { Link, Stack } from '@mui/material';

interface Props {
  title: string;
  content?: string;
  contentLink?: string;
  isEmail?: boolean;
}
const ItemRow = (props: Props) => {
  const { title, content, contentLink, isEmail } = props;
  const handleClick = () => {
    if (isEmail) {
      window.open(`mailto:${contentLink}`, '_blank');
    } else {
      window.open(contentLink, '_blank');
    }
  };
  return (
    <div>
      <Stack direction="row" spacing={1} paddingX={4} paddingY={1}>
        <span style={{ color: 'black', fontSize: 16, fontWeight: '-moz-initial', flex: 1 }}>{title}</span>
        {content && <span style={{ color: 'GrayText', fontSize: 16, flex: 5 }}>{content}</span>}
        {contentLink && (
          <div style={{ color: 'GrayText', fontSize: 16, flex: 5 }}>
            <Link
              variant="body2"
              href={contentLink}
              underline={isEmail ? 'none' : 'always'}
              onClick={() => {
                handleClick();
              }}
            >
              {contentLink}
            </Link>
          </div>
        )}
      </Stack>
    </div>
  );
};
export default ItemRow;
