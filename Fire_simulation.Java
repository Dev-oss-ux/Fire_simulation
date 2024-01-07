import java.util.Random;

public class FireSimulation {
    private boolean[][] grid;
    private int width;
    private int height;
    private double fireSpreadProbability;

    public FireSimulation(int width, int height, double fireSpreadProbability) {
        this.width = width;
        this.height = height;
        this.fireSpreadProbability = fireSpreadProbability;
        this.grid = new boolean[height][width];
    }

    public void setCellOnFire(int x, int y) {
        grid[y][x] = true;
    }

    public void simulateFireSpread() {
        Random random = new Random();
        boolean[][] newGrid = new boolean[height][width];

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                newGrid[y][x] = grid[y][x];

                if (grid[y][x]) {
                    // Check top neighbor
                    if (y > 0 && random.nextDouble() < fireSpreadProbability) {
                        newGrid[y - 1][x] = true;
                    }

                    // Check bottom neighbor
                    if (y < height - 1 && random.nextDouble() < fireSpreadProbability) {
                        newGrid[y + 1][x] = true;
                    }

                    // Check left neighbor
                    if (x > 0 && random.nextDouble() < fireSpreadProbability) {
                        newGrid[y][x - 1] = true;
                    }

                    // Check right neighbor
                    if (x < width - 1 && random.nextDouble() < fireSpreadProbability) {
                        newGrid[y][x + 1] = true;
                    }
                }
            }
        }

        grid = newGrid;
    }

    public boolean hasFireReachedEdges() {
        for (int y = 0; y < height; y++) {
            if (grid[y][0] || grid[y][width - 1]) {
                return true;
            }
        }

        for (int x = 0; x < width; x++) {
            if (grid[0][x] || grid[height - 1][x]) {
                return true;
            }
        }

        return false;
    }
}
