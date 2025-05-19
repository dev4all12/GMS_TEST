function initSession(connection, requestedTag, cb) {
	
    connection.execute(
      `alter session set nls_date_format = 'YYYY-MM-DD' nls_language = AMERICAN`,
      cb);
  }
  
  module.exports = {
    gmsPool: {
        
        user: process.env.OR_DB_USER || "GMS10112017D",
        password: process.env.OR_DB_PASS || "GMS10112017D",
         connectString: process.env.OR_DB_CONSTRING
         || `(DESCRIPTION= 
                          (ADDRESS=
                              (PROTOCOL=TCP)
                              (HOST=172.17.1.16)
                              (PORT=1521)
                          )
                          (CONNECT_DATA= 
                            (SERVICE_NAME=CRPFGMS)
                            (SERVER=DEDICATED)
                          )
                      )`,
        
        _enableStats: true,
        poolAlias: 'GMSpool',
        poolIncrement: 1,// only grow the pool by one connection at a time
        poolMax:100, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
        poolMin:0, // start with no connections; let the pool shrink completely
        poolPingInterval : 60,
       // poolPingInterval: 1, // check aliveness of connection if idle in the pool for 60 seconds
       // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds1
        queueMax: -1, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
       queueTimeout: 0, // terminate getConnection() calls queued for longer than 60000 milliseconds
        //  sessionCallback: initSession, // function invoked for brand new connections or by a connection tag mismatch
        // sodaMetaDataCache: false, // Set true to improve SODA collection access performance
        stmtCacheSize: 50000, // number of statements that are cached in the statement cache of each connection
        enableStatistics: true, // record pool usage for oracledb.getPool().getStatistics() and logStatistics()
        sessionCallback: initSession,
    
      },
    };