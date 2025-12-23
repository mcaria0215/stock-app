import mongoose from 'mongoose';
import { connectToDatabase } from '@/database/mongoose';

/**
 * 데이터베이스 연결 테스트
 */
export const testDatabaseConnection = async () => {
  console.log('🔄 데이터베이스 연결 테스트 시작...');
  
  try {
    // 환경 변수 확인
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI 환경 변수가 설정되지 않았습니다.');
      return false;
    }
    
    console.log(`📍 MongoDB URI: ${process.env.MONGODB_URI}`);
    
    // 데이터베이스 연결
    await connectToDatabase();
    
    // mongoose 연결 상태 확인
    const readyState = mongoose.connection.readyState;
    if (readyState === 1) {
      console.log('✅ MongoDB 연결 성공!');
      console.log(`   - Host: ${mongoose.connection.host}`);
      console.log(`   - Database: ${mongoose.connection.name}`);
      console.log(`   - 상태: Connected`);
      return true;
    } else {
      console.error('❌ MongoDB 연결 실패! (readyState가 1이 아님)');
      console.log(`   - 현재 상태: ${readyState}`);
      return false;
    }
  } catch (error) {
    console.error('❌ 데이터베이스 연결 중 오류 발생:');
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
};

/**
 * 단순 Ping 테스트
 */
export const testDatabasePing = async () => {
  console.log('🔄 Ping 테스트 시작...');
  
  try {
    await connectToDatabase();
    
    // Ping 커맨드 실행
    const result = await mongoose.connection.db?.admin().ping();
    
    if (result?.ok === 1) {
      console.log('✅ Ping 성공!');
      return true;
    } else {
      console.error('❌ Ping 실패!');
      return false;
    }
  } catch (error) {
    console.error('❌ Ping 테스트 중 오류:');
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
};

/**
 * 연결 상태 상세 정보
 */
export const getConnectionStatus = async () => {
  try {
    await connectToDatabase();
    
    const conn = mongoose.connection;
    
    const status = {
      connected: conn.readyState === 1,
      readyState: conn.readyState,
      readyStateString: ['disconnected', 'connected', 'connecting', 'disconnecting'][conn.readyState],
      host: conn.host,
      port: conn.port,
      name: conn.name,
      models: Object.keys(conn.models),
    };
    
    console.log('📊 연결 상태:');
    console.log(JSON.stringify(status, null, 2));
    
    return status;
  } catch (error) {
    console.error('❌ 연결 상태 확인 중 오류:');
    console.error(error instanceof Error ? error.message : String(error));
    return null;
  }
};

// 테스트 실행 (직접 실행시)
if (require.main === module) {
  (async () => {
    console.log('====================================');
    console.log('   MongoDB 연결 테스트');
    console.log('====================================\n');
    
    const connectionTest = await testDatabaseConnection();
    console.log('');
    
    const pingTest = await testDatabasePing();
    console.log('');
    
    await getConnectionStatus();
    
    console.log('\n====================================');
    console.log('   테스트 완료');
    console.log('====================================');
    
    process.exit(connectionTest && pingTest ? 0 : 1);
  })();
}
