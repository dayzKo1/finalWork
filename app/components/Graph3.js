import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import { Button, List, Divider, Card, Row, Col, Table } from "antd"
import ReactECharts from "echarts-for-react"
import React, { useState } from "react"

const Graph3 = () => {
  const option = {
    // title: {
    //   text: '某站点用户访问来源',
    //   subtext: '纯属虚构',
    //   x: 'center'
    // },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      // orient: 'vertical',
      bottom: "5%",
      left: "center",
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "40%"],
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }

  function onChartReady(echarts) {
    console.log("echarts is ready", echarts)
  }

  function onChartClick(param, echarts) {
    console.log(param, echarts)
  }

  function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts)
  }

  return (
    <div>
      <h3>
        <strong>访客来源</strong>
      </h3>
      <ReactECharts
        option={option}
        style={{ height: 300 }}
        onChartReady={onChartReady}
        onEvents={{
          click: onChartClick,
          legendselectchanged: onChartLegendselectchanged,
        }}
      />
    </div>
  )
}

export default Graph3
