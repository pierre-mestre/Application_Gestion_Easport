getTrainingByPlayer(player, callback){
        const values = [player];
        db.get('*', 'liaisonentrainement','idjoueur=$1', values, function(result){
            var training = [];
            if(result.rowCount > 0){
                var where = '';
                var values = [];
                var last = result.rows.length-1;
                values.push[result.rows[0].identrainement];
                where += 'id=$1';
                if(last == 1){
                    values.push[result.rows[1].identrainement];
                    where += ' || id=$2';
                }
                else{ 
                    where += ' || ';
                    for(let i=1; i<last; i++){
                        values.push[result.rows[i].identrainement];
                        where += 'id=$'+(i+1)+' || ';
                    }
                    values.push[result.rows[i].identrainement];
                    where += 'id=$'+last;
                }
                
                db.get('', 'entrainement', where, values, function(michel){
                    training.push(michel);
                });
            }
            callback(training);
        });
    }