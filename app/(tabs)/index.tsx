import { Image, StyleSheet, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { convertTimestampToTimezone } from '@/utils/convert-time';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function HomeScreen() {
  const originalA = convertTimestampToTimezone(1746164993772, "America/Toronto");
  const originalB = convertTimestampToTimezone(1746164993772, "Asia/Shanghai");
  const a = dayjs(originalA).format("YYYY-MM-DD HH:mm:ss"); 
  const b = dayjs(originalB).format("YYYY-MM-DD HH:mm:ss");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <Text>
        {a}
      </Text>
      <Text>
        {b}
      </Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
