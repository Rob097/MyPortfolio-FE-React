import { PieChart } from '@mui/x-charts/PieChart';

const CustomPieChart = ({ data, width, height, hideLegend }) => {

    const pieParams = {
        innerRadius: 30,
        outerRadius: 100,
        paddingAngle: 5,
        cornerRadius: 5,
        cx: width / 2,
        cy: height / 2 - 30
    };

    return (
        <PieChart
            series={[
                {
                    data: [
                        ...data
                    ],
                    ...pieParams
                },
            ]}
            height={height}
            width={width}
            sx={{ width: '100%', minWidth: '100%', minHeight: '100%' }}
            slotProps={{
                legend: {
                    hidden: hideLegend,
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 10,
                },
            }}
        />
    )

}

export default CustomPieChart;