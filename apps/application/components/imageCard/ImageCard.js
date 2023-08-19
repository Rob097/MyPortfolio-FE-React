import Typography from '@mui/material/Typography';
import classes from "./ImageCard.module.scss";

const ImageCard = ({ image, title }) => (
    <div className={classes.card}>
        <div className={classes.overlay} style={{
            backgroundImage: `url("${image}")`
        }}>
            <Typography className={classes.header} variant="h2">{title}</Typography>
        </div>
    </div>
);

export default ImageCard;