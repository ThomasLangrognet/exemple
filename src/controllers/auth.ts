import {daos} from '../config_database';
import {UserDAO} from "../models/user/UserDAO";
import {User} from "../models/user/User";
import {OperatorDAO} from "../models/operator/OperatorDAO";
import {Operator} from "../models/operator/Operator";
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

const UserDAO: UserDAO = daos['user'];

const OperatorDAO: OperatorDAO = daos['operator'];


export const registerClient = (req: Express.Request, res: Express.Response) => {
    const password = req.body.password;
    const username = req.body.username;
    const operatorId = req.body.operatorId;
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mail = req.body.mail;
    const tel = req.body.tel;
    const expirationDate = req.body.expirationDate ? new Date(req.body.expirationDate) : undefined;

    if (!username || !password || !operatorId || !companyName || !firstName || !lastName || !mail || !expirationDate) {
        res.status(400).send({ Message: 'Invalid request' });
        return;
    }else{
      let split0 = req.body.username.split('/')
      if(split0[split0.length -1] === '__software__'){
        res.status(403).send({Message: 'restricted username!'})
      }else{
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, password_hashedANDsaltedhash) {
            let user: User = new User(username, password_hashedANDsaltedhash, false);
            crypto.randomBytes(6, function (err, buffer) {
                let id = buffer.toString('hex');
                let operator: Operator = new Operator(firstName, lastName, username, companyName, operatorId, mail, tel, expirationDate);
                UserDAO.exists(username).then((exists) => {
                    if (exists) {
                        res.status(403).send({Message: 'this username is already taken!'})

                    } else {
                        UserDAO.add(user).then((result) => {
                            OperatorDAO.add(operator).then((result) => {
                                res.status(200).send({Message: 'client successfully created'})
                            }).catch(err => {
                                console.error(err);
                                res.status(500).end();
                            });
                        }).catch(err => {
                            console.error(err);
                            res.status(500).end();
                        });
                    }
                }).catch(err => {
                    console.error(err);
                    res.status(500).end();
                });
            });
        });
    });
  };
 };
};

export const registerAdmin = (req: Express.Request, res: Express.Response) => {
  let split0 = req.body.username.split('/')
  if(split0[split0.length -1] === '__software__'){
    res.status(403).send({Message: 'restricted username!'})
  }else{
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, password_hashedANDsalted) {
            let user: User = new User(req.body.username, password_hashedANDsalted, true);
            UserDAO.exists(req.body.username).then((exists) => {
                if (exists) {
                    res.status(401).send({Message: 'this username is already taken!'})

                } else {
                    UserDAO.add(user).then((result) => {
                        res.status(200).send({Message: 'admin successfully created'})
                    }).catch(err => {
                        console.error(err);
                        res.status(500).end();
                    });
                }
            }).catch(err => {
                console.error(err);
                res.status(500).end();
            });
        });
    });
  };
}

export const resetPasswordByAdmin = (req: Express.Request, res: Express.Response) => {
    UserDAO.exists(req.body.username).then((exists) => {
      if(!exists) {
        res.status(401).send({Message: 'this user does not exist!'})
      }else{
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.newPassword, salt, function (err, newPassword_hashedANDsalted) {
            UserDAO.resetPassword(req.body.username, newPassword_hashedANDsalted).then((done) => {
                res.status(200).send({Message: 'password reset'})
              }).catch(err => {
                  console.error(err);
                  res.status(500).end();
              });
            });
          });
      }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const resetPasswordByClient = (req: Express.Request, res: Express.Response) => {
      if(req.session.info.username){
        const username = req.session.info.username;
        UserDAO.getIsAdmin(username).then((isAdmin) => {
          if(!isAdmin) {
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(req.body.newPassword, salt, function (err, newPassword_hashedANDsalted) {
                UserDAO.resetPassword(username, newPassword_hashedANDsalted).then((done) => {
                  res.status(200).send({Message: 'password reset'})
                }).catch(err => {
                    console.error(err);
                    res.status(500).end();
                  });
                });
              });
            }else{
              res.status(401).send({Message: 'this user is not a client!'})
            }
        });
      }else{
        {Message: 'no user logged in'}
      }
    }
}

export const login = (req: Express.Request, res: Express.Response) => {
    let isValidPassword = function (password, password_hashedANDsalted) {
        return bcrypt.compareSync(password, password_hashedANDsalted);
    };
    UserDAO.exists(req.body.username).then((exists) => {
        if (!exists) {
            res.status(401).send({Message: 'this user does not exist!'})
        } else {
            UserDAO.getPassword(req.body.username).then((user_password) => {
                if (isValidPassword(req.body.password, user_password) === false) {
                    res.status(401).send({Message: 'invalid password!'})
                } else {
                    let info = {username: req.body.username};
                    req.session.info = info;
                    UserDAO.getIsAdmin(req.body.username).then((status) => {
                        res.status(200).send({Message: 'logged in', isAdmin: status})
                    });
                }
            }).catch(err => {
                console.error(err);
                res.status(500).end();
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
};

export const loginSoftware = (req: Express.Request, res: Express.Response) => {
    let isValidPassword = function (password, password_hashedANDsalted) {
        return bcrypt.compareSync(password, password_hashedANDsalted);
    };
    UserDAO.exists(req.body.username).then((exists) => {
        if (!exists) {
            res.status(401).send({Message: 'this user does not exist!', isAuthenticated: false})
        } else {
            UserDAO.getPassword(req.body.username).then((user_password) => {
                if (isValidPassword(req.body.password, user_password) === false) {
                    res.status(401).send({Message: 'invalid password!', isAuthenticated: false})
                } else {
                    UserDAO.getIsAdmin(req.body.username).then((status) => {
                        let sessID = req.body.username + "/__software__"
                        let info = {username: sessID};
                        req.session.info = info;
                        res.status(200).send({Message: 'logged in', isAuthenticated: true})
                    });
                }
            }).catch(err => {
                console.error(err);
                res.status(500).end();
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
};

export const deleteClient = (req: Express.Request, res: Express.Response) => {
    UserDAO.exists(req.body.username).then((exists) => {
        if (!exists) {
            res.status(401).send({Message: 'this client does not exist!'})
        } else {
            UserDAO.delete(req.body.username).then(() => {
                OperatorDAO.delete(req.body.username).then(() => {
                    res.status(200).send({Message: 'user deleted'})
                })
            })
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const deleteAdmin = (req: Express.Request, res: Express.Response) => {
    UserDAO.exists(req.body.username).then((exists) => {
        if (!exists) {
            res.status(401).send({Message: 'this admin does not exist!'})
        } else {
            UserDAO.delete(req.body.username).then(() => {
                res.status(200).send({Message: 'user deleted'})
            }).catch(err => {
                console.error(err);
                res.status(500).end();
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const getAllAdmins = (req: Express.Request, res: Express.Response) => {
    UserDAO.getAllAdmins().then((list_admins) => {
        res.status(200).json(list_admins)
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const isAdmin = (req: Express.Request, res: Express.Response) => {
    UserDAO.getIsAdmin(req.session.info.username).then((status) => {
        if (status) {
            res.status(200).send({isAdmin: true})
        } else {
            res.status(200).send({isAdmin: false})
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const isAuthenticated = (req: Express.Request, res: Express.Response, next: Function) => {
    if (req.session.info) {
        UserDAO.getIsAdmin(req.session.info.username).then((status) => {
            res.status(200).send({
                Message: 'authenticated',
                isAuthenticated: true,
                isAdmin: status,
                username: req.session.info.username
            })
        }).catch(err => {
            console.error(err);
            res.status(500).end();
        });
    } else {
        res.status(200).send({Message: 'not authenticated!', isAuthenticated: false, isAdmin: false, username: 'none'})
    }
}

export const isAuthenticatedChecker = (req: Express.Request, res: Express.Response, next: Function) => {
    if (req.session.info) {
        next()
    } else {
        res.status(401).send({Message: 'not authenticated!'})
    }
}

export const adminChecker = (req: Express.Request, res: Express.Response, next: Function) => {
    UserDAO.getIsAdmin(req.session.info.username).then((status) => {
        if (status) {
            next()
        } else {
            res.status(401).send({Message: 'not an admin!'})
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

export const logout = (req: Express.Request, res: Express.Response) => {
    req.session.destroy((err) => {
        res.status(200).send({Message: "logout"});
    });
};
