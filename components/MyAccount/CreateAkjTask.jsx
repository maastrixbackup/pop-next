import React, { useEffect, useState } from "react";
import { APIURL } from "../../Methods/Fetch";
import { axiosGet, axiosPost } from "../../Methods/Save";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateAkjTask(props) {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    var url = APIURL() + `tasksummary`;
    axiosGet(url).then((response) => {
      setSummaries(response.data.data);
    });
  }, []);
  const [valid, setValid] = useState({
    summary: "",
    detail: "",
    dueDate: "",
    category: "",
    subCategory: "",
  });
  const { setTab, setMessage, setAlertType, setOpen } = props;
  const initialState = {
    owner: "",
    summary: "",
    priorityId: 1,
    dueDate: "",
    category: "",
    subCategory: "",
  };

  const initialDescState = {
    detail: "",
  };
  const [taskDetails, setTaskDetails] = useState(initialState);
  const [descDetails, setDescDetails] = useState(initialDescState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
    if (value.length > 0) setValid({ ...valid, [name]: true });
  };
  const createTask = () => {
    try {
      if (
        taskDetails.summary.length > 0 &&
        descDetails.detail.length > 0 &&
        taskDetails.category.length > 0 &&
        taskDetails.subCategory.length > 0
      ) {
        var first_name = JSON.parse(
          localStorage.getItem("user_details")
        ).first_name;
        var last_name = JSON.parse(
          localStorage.getItem("user_details")
        ).last_name;
        var url = APIURL() + `create-task`;
        var data = {
          ...taskDetails,
          ...descDetails,
          owner: first_name + ` ` + last_name,
        };

        axiosPost(url, data).then((response) => {
          if (response.data[0].response.status === "success") {
            setMessage("Task Created Successfully");
            setAlertType("success");
            setOpen(true);
            setTab("create-akj-task");
            setTaskDetails(initialState);
            setDescDetails(initialDescState);
          } else {
            setMessage("Technical issue,Please try again");
            setAlertType("error");
            setOpen(true);
            setTab("create-akj-task");
            setTaskDetails(initialState);
            setDescDetails(initialDescState);
          }
        });
      } else if (taskDetails.summary.length === 0) {
        setMessage("Please choose Summary");
        setAlertType("error");
        setValid({ ...valid, summary: false });
        setOpen(true);
      } else if (descDetails.detail.length === 0) {
        setMessage("Please enter Description");
        setAlertType("error");
        setValid({ ...valid, detail: false });
        setOpen(true);      
      } else if (taskDetails.category.length === 0) {
        setMessage("Please enter Category");
        setAlertType("error");
        setValid({ ...valid, category: false });
        setOpen(true);
      } else if (taskDetails.subCategory.length === 0) {
        setMessage("Please enter Sub-Category");
        setAlertType("error");
        setValid({ ...valid, subCategory: false });
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  return (
    <>
      <div className="col-lg-9 ">
        <div className="inner-title-box">
          <div>
            <h4 className="title-inner">Create Task</h4>
          </div>
        </div>
        {/* <div className="btn btn-primary" onClick={() => setTab("tasks")}>
                    <ArrowBackIcon sx={{ cursor: "pointer", color: "white" }} />
                </div> */}

        <div className="ticket-box">
          <div className="row flex-box">
            <div className="col-lg-7">
              <div className="ticket-form-sec">
                <div className="row">
                  {/* <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor className="form-label">
                                                Summary
                                            </label>
                                            <input
                                                value={taskDetails.summary}
                                                onChange={(e) => handlechange(e)}
                                                name="summary"
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div> */}

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Summary
                      </label>
                      <select
                        className={
                          valid.summary === false
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Default select example"
                        name="summary"
                        onChange={(e) => handlechange(e)}
                      >
                        <option value="">Choose Summary</option>
                        {summaries.map((s, i) => (
                          <option key={i} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="App">
                      <p>Description</p>
                      <CKEditor
                        editor={ClassicEditor}
                        data={descDetails.detail}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescDetails({
                            ...descDetails,
                            detail: data,
                          });
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor className="form-label">
                                                Priority
                                            </label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                name="priorityId"
                                                onChange={(e) => handlechange(e)}
                                            >
                                                <option value="2">
                                                    High
                                                </option>
                                                <option value="1">
                                                    Medium
                                                </option>
                                                <option value="0">
                                                    Low
                                                </option>
                                            </select>
                                        </div>
                                    </div> */}

                  

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Category
                      </label>
                      <input
                        value={taskDetails.category}
                        onChange={(e) => handlechange(e)}
                        name="category"
                        type="text"
                        className={
                          valid.category === false
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor className="form-label">
                        Sub-Category
                      </label>
                      <input
                        value={taskDetails.subCategory}
                        onChange={(e) => handlechange(e)}
                        name="subCategory"
                        type="text"
                        className={
                          valid.subCategory === false
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3 text-center">
                      <button
                        onClick={createTask}
                        type="button"
                        className="btn btn-primary"
                      >
                        Submit Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAkjTask;
