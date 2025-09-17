import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchMajor, setSearchMajor] = useState("");
  const [searchInterest, setSearchInterest] = useState("");

  const [filteredStudents, setFilteredStudents] = useState([]);

  const [page, setPage] = useState(1);

  //每页学生数量
  const STUDENTS_PER_PAGE = 24;

  //计算总页数
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

  //获取当前页学生数据
  const getCurrentPageStudents = () => {
    const startIndex = (page - 1) * STUDENTS_PER_PAGE;
    const endIndex = startIndex + STUDENTS_PER_PAGE;
    return filteredStudents.slice(startIndex, endIndex);
  };

  //创建分页项
  const renderPaginationItems = () => {
    const items = [];

    //首页
    // items.push(
    //   <Pagination.First
    //     key="first"
    //     onClick={() => setPage(1)}
    //     disabled={page === 1}
    //   ></Pagination.First>
    //);

    //上一页;
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      >
        Previous
      </Pagination.Prev>
    );

    //计算要显示的页码范围
    let startPage = Math.max(1, page - 4);
    let endPage = Math.min(totalPages, page + 4);

    //确保始终显示9个页码;
    if (endPage - startPage < 8) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 8);
      } else {
        startPage = Math.max(1, endPage - 8);
      }
    }

    //添加页码
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    //下一页;
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
        disabled={page === totalPages}
      >
        Next
      </Pagination.Next>
    );

    //末页
    // items.push(
    //   <Pagination.Last
    //     key="last"
    //     onClick={() => setPage(totalPages)}
    //     disabled={page === totalPages}
    //   />
    // );

    return items;
  };

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw4/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const filtered = students.filter((stu) => {
      const nameMatch =
        !searchName ||
        `${stu.name.first}${stu.name.last}`
          .toLowerCase()
          .includes(searchName.toLowerCase());

      const majorMatch =
        !searchMajor ||
        stu.major.toLowerCase().includes(searchMajor.toLowerCase());

      const interestMatch =
        !searchInterest ||
        stu.interests.some((interest) =>
          interest.toLowerCase().includes(searchInterest.toLowerCase())
        );

      return nameMatch && majorMatch && interestMatch;
    });

    setFilteredStudents(filtered);
    setPage(1);
  }, [searchName, searchMajor, searchInterest, students]);

  function handleReset() {
    setSearchName("");
    setSearchMajor("");
    setSearchInterest("");
  }

  const currentPageStudens = getCurrentPageStudents();

  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={searchMajor}
          onChange={(e) => setSearchMajor(e.target.value)}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={searchInterest}
          onChange={(e) => setSearchInterest(e.target.value)}
        />
        <br />
        <Button variant="neutral" onClick={handleReset}>
          Reset Search
        </Button>
      </Form>
      <br />
      <br />
      <p>There are {filteredStudents.length} student(s) matching your search</p>
      <Container fluid>
        <Row>
          {currentPageStudens.length > 0 ? (
            currentPageStudens.map((stu) => (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={stu.id}>
                <Student {...stu} />
              </Col>
            ))
          ) : (
            <p>Studens is loading!</p>
          )}
        </Row>
      </Container>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {" "}
          {renderPaginationItems()}
        </Pagination>
      )}
    </div>
  );
};

export default Classroom;
