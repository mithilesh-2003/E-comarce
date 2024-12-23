import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const CardNumber = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007BFF;
`;

function Dashboard() {
  return (
    <>
       <DashboardContainer>
      <Card>
        <CardTitle>All Products</CardTitle>
        <CardNumber>150</CardNumber> {/* Replace with dynamic data */}
      </Card>

      <Card>
        <CardTitle>All Ordered</CardTitle>
        <CardNumber>80</CardNumber> {/* Replace with dynamic data */}
      </Card>

      <Card>
        <CardTitle>All Delivered</CardTitle>
        <CardNumber>70</CardNumber> {/* Replace with dynamic data */}
      </Card>

      <Card>
        <CardTitle>All Pending</CardTitle>
        <CardNumber>10</CardNumber> {/* Replace with dynamic data */}
      </Card>
    </DashboardContainer>
    </>
  )
}

export default Dashboard
