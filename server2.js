const express =require("express");
const http =express();
const mongodb =require("mongodb");
const url ="mongodb://localhost:27017";
const MongoClient =mongodb.MongoClient;
const bodyParser =require("body-parser")
const urlencodedParser=bodyParser.urlencoded({extended:false})
http.listen(8080,function(){
	console.log("服务已启动")
})
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})
//add添加接口
//http.get("/add",function(req,res){
//	let obj =req.query;
//	MongoClient.connect(url, { useNewUrlParser: true },(err,db)=>{
//		let dbase =db.db("my1808");
//		dbase.collection("dbss").insertOne(obj,(err,data)=>{
//			res.send("添加成功")
//		})
//	})
//})
http.post("/add",urlencodedParser,function(req,res){
	let obj =req.body;
	MongoClient.connect(url, { useNewUrlParser: true },(err,db)=>{
		let dbase =db.db("my1808");
		dbase.collection("dbss").insertOne(obj,(err,data)=>{
			res.send("添加成功")
		})
	})
})

//获取数据
http.get("/msg",(req,res)=>{
	let arr=[];
	MongoClient.connect(url, { useNewUrlParser: true },(err,db)=>{
		let dbase =db.db("my1808");
		dbase.collection("dbss").find().toArray((err,data)=>{
			for (var i = 0; i < 8; i++) {
				
					arr.push(data[mathradom(data.length,0)])
				
			}
			res.send(arr)
		})
	})
})
//删除一条
http.get("/delete",(req,res)=>{
	let id= req.query.id;
	console.log(id)
	MongoClient.connect(url, { useNewUrlParser: true },(err,db)=>{
		let dbase =db.db("my1808");
		dbase.collection("dbss").deleteOne({_id:mongodb.ObjectId(id)},(err,data)=>{
			res.send("删除成功")
		})
	})
})

//变色接口
http.get("/bianse",(req,res)=>{
	let id= req.query.id;
	let obj=req.query
	console.log(id)
	obj.count++
	MongoClient.connect(url, { useNewUrlParser: true },(err,db)=>{
		let dbase =db.db("my1808");
		dbase.collection("dbss").updateOne({_id:mongodb.ObjectId(id)},{$ste:(obj)},(err,data)=>{
			res.send("删除成功")
		})
	})
})

function mathradom(max,min){
	return parseInt(Math.random()*(max-min)+min)
}