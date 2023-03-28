import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import { Button, List, Divider, Card, Row, Col, Table } from "antd"
import React from "react"
import ReactECharts from "echarts-for-react"

const Graph4 = () => {
  const option = {
    // title: {
    //   text: '堆叠区域图'
    // },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  }
  return (
    <div>
      <h3>
        <strong>广告投放</strong>
      </h3>
      <ReactECharts option={option} style={{ height: 300 }} />;
    </div>
  )
}

export default Graph4
