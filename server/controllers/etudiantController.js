const mysql=require('mysql');

   //Connection pool
   const pool = mysql.createPool({
    connectionLimit :100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME


   });

//view etudiant
exports.view = (req,res) => {

    pool.getConnection((err,connection)=>{
    if(err) throw err;//not connected
    console.log('Connect as ID :'+connection.threadId);

    //etudiant connection
    connection.query('SELECT * FROM etudiant',(err,rows) => {
        //when done with connection ,release it
        connection.release();
        if(!err){
            res.render('home',{rows});
        }else{
            console.log(err);
        }
        console.log('Les données sur le table  etudiant sonts :\n',rows);
    });
    });
}
//find etudiant search
exports.find = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;//not connected
        console.log('Connect as ID :'+connection.threadId);
        
        let searchTerm = req.body.search1;
        //etudiant connection
        connection.query('SELECT * FROM etudiant WHERE id_etu LIKE ? OR mat_etu LIKE ? OR nom_etu LIKE ? OR prenom_etu LIKE ? OR tel_etu LIKE ? OR gmail_etu LIKE ? ',['%'+searchTerm+'%','%'+searchTerm+'%','%'+searchTerm+'%','%'+searchTerm+'%','%'+searchTerm+'%','%'+searchTerm+'%'],(err,rows) => {
            //when done with connection ,release it
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            console.log('Les données sur le table  etudiant sonts :\n',rows);
        });
        });
}
//ajout nouveau etudiant
exports.form = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;//not connected
        console.log('Connect as ID :'+connection.threadId);
    
        //etudiant connection
        connection.query('SELECT * FROM etudiant',(err,rows) => {
            //when done with connection ,release it
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            console.log('Les données sur le table  etudiant sonts :\n',rows);
        });
        });
    }
    exports.form = (req,res) => {
        res.render('add-etudiant');
    }

    //Ajout new etudiant 
    exports.create = (req,res) => {
        const {mat,nom,prenom,tel,gmail}=req.body;

        pool.getConnection((err,connection)=>{
            if(err) throw err;//not connected
            console.log('Connect as ID :'+connection.threadId);
            
            let searchTerm = req.body.search1;
            //etudiant connection
            connection.query('INSERT INTO etudiant(mat_etu,nom_etu,prenom_etu,tel_etu,gmail_etu) VALUES(?,?,?,?,?)',[mat,nom,prenom,tel,gmail],(err,rows) => {
                //when done with connection ,release it
                connection.release();
                if(!err){
                    res.render('add-etudiant',{alert:'Ajout Etudiant avec succé!'});
                }else{
                    console.log(err);
                }
                console.log('Les données sur le table  etudiant sonts :\n',rows);
            });
            });
}


//Afficher etudiant à Modifier
exports.edit = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;//not connected
        console.log('Connect as ID :'+connection.threadId);
    
        //etudiant connection
        connection.query('SELECT * FROM etudiant WHERE id_etu= ?',[req.params.id_etu],(err,rows) => {
            //when done with connection ,release it
            connection.release();
            if(!err){
                res.render('edit-etudiant',{rows});
            }else{
                console.log(err);
            }
            console.log('Les données sur le table  etudiant sonts :\n',rows);
        });
        });
 }

 
 //Modifier etudiant 
 exports.update = (req,res) => {
    const {mat,nom,prenom,tel,gmail}=req.body;

    pool.getConnection((err,connection)=>{

        if(err) throw err;//not connected
        console.log('Connect as ID :'+connection.threadId);
    
        //etudiant connection
        connection.query('UPDATE etudiant SET mat_etu = ?, nom_etu =?,prenom_etu=?,tel_etu=?,gmail_etu=? WHERE id_etu= ?',[mat,nom,prenom,tel,gmail,req.params.id_etu],(err,rows) => {
            //when done with connection ,release it
            connection.release();
            if(!err){
                

               
                    pool.getConnection((err,connection)=>{
                        if(err) throw err;//not connected
                        console.log('Connect as ID :'+connection.threadId);
                    
                        //etudiant connection
                        connection.query('SELECT * FROM etudiant WHERE id_etu= ?',[req.params.id_etu],(err,rows) => {
                            //when done with connection ,release it
                            connection.release();
                            if(!err){
                                res.render('edit-etudiant',{rows,alert:'Modification reussit avec succé'});
                            }else{
                                console.log(err);
                            }
                            console.log('Les données sur le table  etudiant sonts :\n',rows);
                        });
                        });
                 


            }else{
                console.log(err);
            }
            console.log('Les données sur le table  etudiant sonts :\n',rows);
        });
        });
 }


 //Delete etudiant
exports.delete = (req,res) => {
    pool.getConnection((err,connection)=>{
        if(err) throw err;//not connected
        console.log('Connect as ID :'+connection.threadId);
    
        //etudiant connection
        connection.query('DELETE FROM etudiant WHERE id_etu= ?',[req.params.id_etu],(err,rows) => {
            //when done with connection ,release it
            connection.release();
            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
            console.log('Les données sur le table  etudiant sonts :\n',rows);
        });
        });
 }

  