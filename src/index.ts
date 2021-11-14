import { digitGenerator } from "./pi"
import { stdout } from 'process';

const digits = digitGenerator()

stdout.write("π: ")
stdout.write(`${digits.next().value}`)
stdout.write(".")
for (var i = 1; i < 1000; i++) {
    stdout.write(`${digits.next().value}`)
}
stdout.write("\n")

