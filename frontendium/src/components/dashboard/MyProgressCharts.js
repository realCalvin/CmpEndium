import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Line, Pie } from 'react-chartjs-2';
import './MyProgressCharts.css';

function MyProgressCharts(props) {
    const [jobs, setJobs] = useState([]);

    const [lineGraphLabels, setLineGraphLabels] = useState([]);
    const [lineGraphData, setLineGraphData] = useState([]);

    const [pieChartData, setPieChartData] = useState([]);

    /* @@@@@@@@@@@@@@@@@@@@@@@@@@@  LINE GRAPH @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    const lineData = {
        labels: lineGraphLabels,
        datasets: [
            {
                label: '# of Jobs Applied',
                data: lineGraphData,
                fill: false,
                backgroundColor: 'rgb(93, 99, 213)',
                borderColor: 'rgba(93, 99, 213, 0.2)'
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    function lineGraph() {
        // generate dates for labels
        const labelMap = new Map();

        // start and end date
        const firstDate = new Date(jobs[0].date);
        const lastDate = new Date(jobs[jobs.length - 1].date);
        console.log(lastDate);
        console.log(firstDate);

        // count jobs applied for each day between start and end
        for (let i = 0; i < jobs.length; i++) {
            if (labelMap.has(jobs[i].date)) {
                const cnt = labelMap.get(jobs[i].date);
                labelMap.set(jobs[i].date, cnt + 1);
            } else {
                labelMap.set(jobs[i].date, 1);
            }
        }

        // generate label
        const days = (firstDate - lastDate) / 86400000;
        const tempLineLabel = [];
        for (let i = 0; i <= days; i++) {
            tempLineLabel.push(lastDate.toLocaleDateString());
            lastDate.setDate(lastDate.getDate() + 1);
        }
        setLineGraphLabels(tempLineLabel);

        let totalCount = 0;
        const tempLineData = [];
        function pad(n) { return n < 10 ? '0' + n : n; }
        for (let i = 0; i < tempLineLabel.length; i++) {
            const tempDate = new Date(tempLineLabel[i]);
            const resDate = pad(tempDate.getMonth() + 1) + '/' + pad(tempDate.getDate()) + '/' + tempDate.getFullYear();
            const count = labelMap.get(resDate);
            if (count) {
                totalCount += count;
            }
            tempLineData.push(totalCount);
        }
        setLineGraphData(tempLineData);
    }

    /* @@@@@@@@@@@@@@@@@@@@@@@@@@@  PIE CHART @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
    const pieData = {
        labels: ['Interview', 'Offer', 'Rejected', 'Applied'],
        datasets: [
            {
                label: '# of Votes',
                data: pieChartData,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(70, 246, 140, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(93, 99, 213, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(70, 246, 140, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(93, 99, 213, 1)'
                ],
                borderWidth: 2
            }
        ]
    };

    function pieChart() {
        const pieMap = new Map();
        pieMap.set('Interview', 0);
        pieMap.set('Offer', 0);
        pieMap.set('Rejected', 0);
        pieMap.set('Applied', 0);

        for (let i = 0; i < jobs.length; i++) {
            const cnt = pieMap.get(jobs[i].status);
            pieMap.set(jobs[i].status, cnt + 1);
        }

        const pieData = [];
        pieData.push(pieMap.get('Interview'));
        pieData.push(pieMap.get('Offer'));
        pieData.push(pieMap.get('Rejected'));
        pieData.push(pieMap.get('Applied'));
        setPieChartData(pieData);
    }

    useEffect(async () => {
        setJobs(props.jobs);
        if (jobs.length > 1) {
            console.log(jobs);
            lineGraph();
            pieChart();
        }
    }, [props.jobs, jobs]);

    return (
        <div id="MyProgressCharts">
            <Row className="progress-charts">
                <Line data={lineData} options={options} />
            </Row>
            <Row className="progress-charts">
                <Pie data={pieData} />
            </Row>
        </div>
    );
}

export default MyProgressCharts;
