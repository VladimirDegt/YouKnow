import Loader from '@/src/components/shared/Loader';
import { COLORS } from '@/src/constants/colors';
import { Category } from '@/src/types/categories';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryButtonProps {
  item: Category;
  onPress: (id: number, route: string) => void;
  isLoading: boolean;
  loadingButtonId: number | null;
  t: (key: string) => string;
}

export const CategoryButton = ({ 
  item, 
  onPress, 
  isLoading, 
  loadingButtonId,
  t 
}: CategoryButtonProps) => (
  <View style={styles.gridItem}>
    <TouchableOpacity
      style={styles.btn}
      onPress={() => onPress(item.id, item.route)}
      disabled={isLoading}
    >
      <View style={styles.buttonContent}>
        {loadingButtonId === item.id && <Loader />}
        <Text style={styles.textBtn}>{t(`home.categories.${item.name}`)}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  gridItem: {
    width: '48%',
    paddingVertical: 8,
  },
  btn: {
    aspectRatio: 1,
    backgroundColor: COLORS.btn_background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  textBtn: {
    fontSize: 20,
    color: COLORS.text_white,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 