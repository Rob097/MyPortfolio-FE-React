import classes from "./ImageCard.module.scss";
import SoftTypography from '@rob097/common-lib/components/SoftTypography';

const ImageCard = ({ image, title }) => (
    <div className={classes.card}>
        <div className={classes.overlay} style={{
            backgroundImage: `url("${image}")`
        }}>
            <SoftTypography className={classes.header} variant="h2" >{title}</SoftTypography>
        </div>
    </div>
);

export default ImageCard;