const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./connector");

const {
    v1: uuidv1
} = require("uuid");

const USER_CREATED_MSG = "User Created Successfully";
const ACCOUNT_CREATED_MSG = "Account Created Successfully";
const RETURNED_ALL_DATA = "Returned All Data";
const DATA_NOT_FOUND = "Data Not Found";
const RETURNED_USER_SPECIFIC_DATA = "Returned Specific User Data";
const RETURNED_ACCOUNT_SPECIFIC_DATA = "Returned Specific Account Data";
const DELETED_MSG = "Deleted Successfully";
const UPDATED_MSG = "Updated Successfully";
const CREATED_MSG = "Created Successfully";
const DATA_NOT_FOUND_GIVEN_TIME = "Data Not Found In Given Time";

function Header(result) {
    var header_obj = {
        "account_id": result[0].account_id,
        "user_id": result[0].user_id
    }
    return header_obj;
}


const app = express();
app.use(cors());
app.use(bodyParser.json());

// create_account  POST
app.post("/client_api/accounts", async (req, res) => {
    const account_id = uuidv1();
    const {
        name,
        locale
    } = req.body;
    let sql =
        "INSERT INTO account (account_id, name, locale) VALUES (?,?,?);";

    await connection.query(
        sql,
        [account_id, name, locale],
        (err, result, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                res.status(201).json({
                    msg: ACCOUNT_CREATED_MSG,
                    account_id:account_id,
                    name:name,
                    locale:locale
                });
            }
        }
    );
});

// get_all_accounts  GET
app.get("/client_api/accounts", async (req, res) => {
    let sql = "select * from account;";
    await connection.query(sql, (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if(result.length===0){
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            }
            else{
                if(result.length===0){
                    res.status(200).json({
                        msg: DATA_NOT_FOUND
                    });
                }
                else{
                    res.status(200).json({
                        msg: RETURNED_ALL_DATA,
                        response: result,
                    });
                }
            }
        }
    });
});

// get_account/:account_id=  GET
app.get("/client_api/accounts/:account_id", async (req, res) => {
    const account_id = req.params.account_id;
    let sql = "select * from account where account_id=?;";
    await connection.query(sql, [account_id], (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if (result.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            } else {
                res.status(200).json({
                    msg: RETURNED_ACCOUNT_SPECIFIC_DATA,
                    response: result,
                });
            }
        }
    });
});

// update_account/:account_id=  PATCH
app.patch("/client_api/accounts/:account_id", async (req, res) => {
    const account_id = req.params.account_id;
    const {
        name,
        locale
    } = req.body;

    let sql = "update account set name=?, locale=? where account_id=?;";
    await connection.query(
        sql,
        [name, locale, account_id],
        (err, result, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                    });
                } else {
                    res.status(200).json({
                        msg:UPDATED_MSG,
                        account_id:account_id,
                        name:name,
                        locale:locale
                    });
                }
            }
        }
    );
});

// get_account/:account_id=  GET
app.delete("/client_api/accounts/:account_id", async (req, res) => {
    const account_id = req.params.account_id;
    let sql = "delete from account where account_id=?;";
    await connection.query(sql, [account_id], (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if (result.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            } else {
                res.status(200).json({
                    msg: DELETED_MSG,
                    response: result,
                });
            }
        }
    });
});



// create_user  POST
app.post("/client_api/users", async (req, res) => {
    const user_id = uuidv1();
    const {
        account_id,
        first_name,
        last_name
    } = req.body;
    let sql =
        "INSERT INTO user (account_id, user_id, first_name, last_name) VALUES (?,?,?,?);";

    await connection.query(
        sql,
        [account_id, user_id, first_name, last_name],
        (err, result, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                res.status(201).json({
                    msg: USER_CREATED_MSG,
                    user_id:user_id,
                    first_name:first_name,
                    last_name:last_name
                });
            }
        }
    );
});

// get_all_users  GET
app.get("/client_api/users", async (req, res) => {
    let sql = "select * from user;";
    await connection.query(sql, (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            res.status(200).json({
                msg: RETURNED_ALL_DATA,
                response: result,
            });
        }
    });
});

// get_user/:user_id=  GET
app.get("/client_api/users/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    let sql = "select * from user where user_id=?;";
    await connection.query(sql, [user_id], (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if (result.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            } else {
                res.status(200).json({
                    msg: RETURNED_USER_SPECIFIC_DATA,
                    response: result,
                });
            }
        }
    });
});

// update_user/:user_id=  PATCH
app.patch("/client_api/users/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const {
        first_name,
        last_name
    } = req.body;
    let sql1 = "select * from user where user_id=?;";
    let sql2 = "update user set first_name=?, last_name=? where user_id=?;";
    await connection.query(
        sql1,
        [user_id],
        (err, result, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                    });
                } else {
                    connection.query(
                        sql2,
                        [first_name, last_name, user_id],
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                if (result.length === 0) {
                                    res.status(200).json({
                                        msg: DATA_NOT_FOUND,
                                    });
                                } else {
                                    res.status(200).json({
                                        msg:UPDATED_MSG,
                                        user_id:user_id,
                                        first_name:first_name,
                                        last_name:last_name
                                    });
                                }
                            }
                        }
                    );  
                }
            }
        }
    );
});

// get_user/:user_id=  GET
app.delete("/client_api/users/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    let sql = "delete from user where user_id=?;";
    await connection.query(sql, [user_id], (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if (result.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            } else {
                res.status(200).json({
                    msg: DELETED_MSG,
                    response: result,
                });
            }
        }
    });
});





// add_app_usages/:user_id  POST
app.post("/client_api/app_usages/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    let sql1 = "select account_id from user where user_id=?;";
    let sql2 =
        "INSERT INTO app_usages (account_id, user_id, start_time, end_time) VALUES (?,?,?,?);";

    await connection.query(sql1, [user_id], (err, result1, fields) => {
        if (err) {
            (DATA_NOT_FOUND);
        } else {
            var account_id = result1[0].account_id;
            connection.query(
                sql2,
                [account_id, user_id, dateTime, dateTime],
                (err, result, fields) => {
                    if (err) {
                        res.status(400).json(err.message);
                    } else {
                        if (result.length === 0) {
                            res.status(200).json({
                                msg: DATA_NOT_FOUND,
                            });
                        } else {
                            res.status(201).json({
                                msg:CREATED_MSG,
                                user_id:user_id,
                                start_time:dateTime,
                                end_time:dateTime
                            });
                        }
                    }
                }
            );
        }
    });
});

// get_all_app_usages  GET
app.get("/client_api/app_usages", async (req, res) => {
    let sql = "select * from app_usages;";
    
    await connection.query(sql, (err, result, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {

            if (result.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                });
            } else {
                res.status(200).json({
                    msg: RETURNED_ALL_DATA,
                    response: result
                });
            }   
        }
    });
});

// get_app_usages/:user_id  GET
app.get("/client_api/app_usages/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    let sql = "select * from app_usages where user_id=?;";
    
    function final_result(result) {
        let final_list = []
        result.forEach(element => {
            var res_obj = {
                "start_time": element.start_time,
                "end_time": element.end_time,
            }
            final_list.push(res_obj);
        });
        return final_list;
    }
    await connection.query(
        sql,
        [user_id],
        (err, result, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                    });
                } else {
                    res.status(200).json({
                        Header: Header(result),
                        response: final_result(result),
                    });
                }
            }
        }
    );
});


// add_facial_emotions/:user_id  POST
app.post("/client_api/facial_emotions/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const {
        angry_score,
        disgust_score,
        fear_score,
        happy_score,
        sad_score,
        surprise_score,
        neutral_score,
    } = req.body;

    const positive_score = happy_score;
    const negative_score =
        (angry_score + disgust_score + fear_score + sad_score + neutral_score) / 5;

    let sql1 = "select account_id from user where user_id=?;";
    let sql2 = "INSERT INTO facial_emotions (account_id, user_id, time_stamp, angry_score, disgust_score, fear_score, happy_score, sad_score, surprise_score, neutral_score, positive_score, negative_score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";

    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                (DATA_NOT_FOUND);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    var account_id = result1[0].account_id;
                    connection.query(
                        sql2,
                        [
                            account_id,
                            user_id,
                            dateTime,
                            angry_score,
                            disgust_score,
                            fear_score,
                            happy_score,
                            sad_score,
                            surprise_score,
                            neutral_score,
                            positive_score,
                            negative_score,
                        ],
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                if (result.length === 0) {
                                    res.status(200).json({
                                        msg: DATA_NOT_FOUND,
                                    });
                                } else {
                                    res.status(201).json({
                                        msg:CREATED_MSG,
                                        user_id:user_id,
                                        time_stamp:dateTime,
                                        angry_score:angry_score,
                                        disgust_score:disgust_score,
                                        fear_score:fear_score,
                                        happy_score:happy_score,
                                        sad_score:sad_score,
                                        surprise_score:surprise_score,
                                        neutral_score:neutral_score
                                    });
                                }
                            }
                        }
                    );
                }
            }
        }
    );
});

// get_facial_emotion/:user_id?from=?&to=?  GET date YYYY-MM-DD
app.get("/client_api/facial_emotions/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const from = req.query.from;
    const to = req.query.to;

    let sql1 = "select * from facial_emotions where user_id=?;";
    let sql2 = "select * from facial_emotions where user_id=? and date(time_stamp) between ? and ?;";

    function final_result(result) {
        let final_list = []
        result.forEach(element => {
            var res_obj = {
                "time_stamp": element.time_stamp,
                "angry_score": element.angry_score,
                "disgust_score": element.disgust_score,
                "fear_score": element.fear_score,
                "happy_score": element.happy_score,
                "sad_score": element.sad_score,
                "surprise_score": element.surprise_score,
                "neutral_score": element.neutral_score
            }
            final_list.push(res_obj);
        });
        return final_list;
    }

    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    if (Object.keys(req.query).length === 0) {
                        connection.query(
                            sql1,
                            [user_id],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result),
                                    });
                                }
                            }
                        );
                    } else {
                        connection.query(
                            sql2,
                            [user_id, from, to],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    if (result.length === 0) {
                                        res.status(200).json({
                                            msg: DATA_NOT_FOUND
                                        })
                                    } else {
                                        res.status(200).json({
                                            Header: Header(result),
                                            response: final_result(result),
                                        });
                                    }
                                }
                            }
                        );
                    }
                }
            }
        }
    );
});

// get_all_facial_emotions?from=?&to=?  GET  date YYYY-MM-DD
app.get("/client_api/facial_emotions", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    let sql1 = "select * from facial_emotions;";
    let sql2 = "select * from facial_emotions where date(time_stamp) between ? and ?;";

    if (Object.keys(req.query).length === 0) {
        await connection.query(
            sql1,
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND,
                        });
                    } else {
                        res.status(200).json({
                            response: result,
                        });
                    }
                }
            }
        );
    } else {
        await connection.query(
            sql2,
            [from, to],
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND_GIVEN_TIME,
                        });
                    } else {
                        res.status(200).json({
                            response: result,
                        });
                    }
                }
            }
        );
    }
});


// get_valence_score/:user_id?from=?&to=?  GET date YYYY-MM-DD
app.get("/client_api/valence_score/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const from = req.query.from;
    const to = req.query.to;

    let sql1 = "select * from facial_emotions where user_id=?;";
    let sql2 = "select * from facial_emotions where user_id=?;"
    let sql3 = "select * from facial_emotions where user_id=? and date(time_stamp) between ? and ?;";

    function final_result(result) {
        let final_list = []
        result.forEach(element => {
            var res_obj = {
                "time_stamp": element.time_stamp,
                "positive_score": element.positive_score,
                "negative_score": element.negative_score
            }
            final_list.push(res_obj);
        });
        return final_list;
    }
    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    if (Object.keys(req.query).length === 0) {
                        connection.query(
                            sql2,
                            [user_id],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    } else {
                        connection.query(
                            sql3,
                            [user_id, from, to],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );
});

// get_all_valence_scores?from=?&to=?  GET  date YYYY-MM-DD
app.get("/client_api/valence_score", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    let sql1 = "select * from facial_emotions;";
    let sql2 = "select account_id, user_id, time_stamp, positive_score, negative_score  from facial_emotions;";
    let sql3 = "select account_id, user_id, time_stamp,  positive_score, negative_score from facial_emotions where date(time_stamp) between ? and ?;";
    await connection.query(sql1, (err, result1, fields) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            if (result1.length === 0) {
                res.status(200).json({
                    msg: DATA_NOT_FOUND,
                    response: result1,
                });
            } else {
                if (Object.keys(req.query).length === 0) {
                    connection.query(
                        sql2,
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                res.status(200).json({
                                    response: result,
                                });
                            }
                        }
                    );
                } else {
                    connection.query(
                        sql3,
                        [from, to],
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                res.status(200).json({
                                    response: result,
                                });
                            }
                        }
                    );
                }
            }
        }
    });
});

// add_voice_acoustics?user_id=?  POST
app.post("/client_api/voice_acoustics/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const {
        speaking_rate,
        volume,
        pitch
    } = req.body;
    let sql1 = "select account_id from user where user_id=?;";
    let sql2 = "INSERT INTO voice_acoustics (account_id, user_id, time_stamp, speaking_rate, volume, pitch) VALUES (?,?,?,?,?,?);";

    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                (DATA_NOT_FOUND);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    var account_id = result1[0].account_id;
                    connection.query(
                        sql2,
                        [account_id, user_id, dateTime, speaking_rate, volume, pitch],
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                res.status(201).json({
                                    msg:CREATED_MSG,
                                    user_id:user_id,
                                    time_stamp:dateTime,
                                    speaking_rate:speaking_rate,
                                    volume:volume,
                                    pitch:pitch
                                });
                            }
                        }
                    );
                }
            }
        }
    );
});

// get_all_voice_acoustics?from=?&to=?  GET
app.get("/client_api/voice_acoustics", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    let sql1 = "select * from voice_acoustics;";
    let sql2 = "select * from voice_acoustics where date(time_stamp) between ? and ?;";

    console.log(Object.keys(req.query).length);
    if (Object.keys(req.query).length === 0) {
        await connection.query(
            sql1,
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND,
                        });
                    } else {
                        res.status(200).json({
                            response: result
                        });
                    }
                }
            }
        );
    } else {
        await connection.query(
            sql2[from, to],
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND_GIVEN_TIME,
                        });
                    } else {
                        res.status(200).json({
                            response: result,
                        });
                    }
                }
            }
        );
    }
});

// get_voice_acoustics?user_id=?  GET
app.get("/client_api/voice_acoustics/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const from = req.query.from;
    const to = req.query.to;

    let sql1 = "select * from voice_acoustics where user_id=?;";
    let sql2 = "select * from voice_acoustics where user_id=? and date(time_stamp) between ? and ?;";

    function final_result(result) {
        let final_list = []
        result.forEach(element => {
            var res_obj = {
                "time_stamp": element.time_stamp,
                "speaking_rate": element.speaking_rate,
                "volume": element.volume,
                "pitch": element.pitch
            }
            final_list.push(res_obj);
        });
        return final_list;
    }
    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    if (Object.keys(req.query).length === 0) {
                        connection.query(
                            sql1,
                            [user_id],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    } else {
                        connection.query(
                            sql2,
                            [user_id, from, to],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );
});

// add_user_emotion_map?user_id=?  POST
app.post("/client_api/user_emotion_map/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const {
        understanding_score,
        satisfaction_score
    } = req.body;
    sql1 = "select account_id from user where user_id=?;";
    sql2 = "INSERT INTO user_emotion_map (account_id, user_id, time_stamp, understanding_score, satisfaction_score) VALUES (?,?,?,?,?);";
    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                (DATA_NOT_FOUND);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    var account_id = result1[0].account_id;
                    connection.query(
                        sql2,
                        [
                            account_id,
                            user_id,
                            dateTime,
                            understanding_score,
                            satisfaction_score,
                        ],
                        (err, result, fields) => {
                            if (err) {
                                res.status(400).json(err.message);
                            } else {
                                res.status(201).json({
                                    msg:CREATED_MSG,
                                    user_id:user_id
                                });
                            }
                        }
                    );
                }
            }
        }
    );
});

// get_all_user_emotion_map?from=?&to=?  GET
app.get("/client_api/user_emotion_map", async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    let sql1 = "select * from user_emotion_map;";
    let sql2 = "select * from user_emotion_map where date(time_stamp) between ? and ?;";

    if (Object.keys(req.query).length === 0) {
        await connection.query(
            sql1,
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND,
                        });
                    } else {
                        res.status(200).json({
                            response: result,
                        });
                    }
                }
            }
        );
    } else {
        await connection.query(
            sql2,
            [from, to],
            (err, result, fields) => {
                if (err) {
                    res.status(400).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(200).json({
                            msg: DATA_NOT_FOUND_GIVEN_TIME,
                        });
                    } else {
                        res.status(200).json({
                            response: result,
                        });
                    }
                }
            }
        );
    }
});

// get_user_emotion_map?user_id=?  GET
app.get("/client_api/user_emotion_map/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const from = req.query.from;
    const to = req.query.to;
    let sql1 = "select * from user_emotion_map where user_id=?;";
    let sql2 = "select * from user_emotion_map where user_id=? and date(time_stamp) between ? and ?;";

    function final_result(result) {
        let final_list = []
        result.forEach(element => {
            var res_obj = {
                "time_stamp": element.time_stamp,
                "understanding_score": element.understanding_score,
                "satisfaction_score": element.satisfaction_score
            }
            final_list.push(res_obj);
        });
        return final_list;
    }

    await connection.query(
        sql1,
        [user_id],
        (err, result1, fields) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                if (result1.length === 0) {
                    res.status(200).json({
                        msg: DATA_NOT_FOUND,
                        response: result1,
                    });
                } else {
                    if (Object.keys(req.query).length === 0) {
                        connection.query(
                            sql1,
                            [user_id],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    } else {
                        connection.query(
                            sql2,
                            [user_id, from, to],
                            (err, result, fields) => {
                                if (err) {
                                    res.status(400).json(err.message);
                                } else {
                                    res.status(200).json({
                                        Header: Header(result),
                                        response: final_result(result)
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );
});


module.exports = app;